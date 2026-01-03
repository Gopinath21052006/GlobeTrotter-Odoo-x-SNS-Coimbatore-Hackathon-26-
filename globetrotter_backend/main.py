from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
import models
from auth import hash_password, verify_password

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="GlobeTrotter API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/signup")
def signup(name: str, email: str, password: str, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    user = models.User(
        name=name,
        email=email,
        password=hash_password(password)
    )
    db.add(user)
    db.commit()
    return {"message": "User created"}

@app.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == email).first()

    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"user_id": user.id, "name": user.name}

@app.post("/trips")
def create_trip(user_id: int, name: str, start_date: str, end_date: str, db: Session = Depends(get_db)):
    trip = models.Trip(
        user_id=user_id,
        name=name,
        start_date=start_date,
        end_date=end_date
    )
    db.add(trip)
    db.commit()
    return {"message": "Trip created"}

@app.get("/trips/{user_id}")
def get_trips(user_id: int, db: Session = Depends(get_db)):
    trips = db.query(models.Trip).filter(models.Trip.user_id == user_id).all()
    return trips

@app.post("/stops")
def add_stop(trip_id: int, city: str, start_date: str, end_date: str, db: Session = Depends(get_db)):
    stop = models.Stop(
        trip_id=trip_id,
        city=city,
        start_date=start_date,
        end_date=end_date
    )
    db.add(stop)
    db.commit()
    return {"message": "City added"}

@app.post("/activities")
def add_activity(stop_id: int, name: str, cost: float, date: str, db: Session = Depends(get_db)):
    act = models.Activity(
        stop_id=stop_id,
        name=name,
        cost=cost,
        date=date
    )
    db.add(act)
    db.commit()
    return {"message": "Activity added"}

@app.get("/budget/{trip_id}")
def trip_budget(trip_id: int, db: Session = Depends(get_db)):
    total = 0
    stops = db.query(models.Stop).filter(models.Stop.trip_id == trip_id).all()

    for stop in stops:
        acts = db.query(models.Activity).filter(models.Activity.stop_id == stop.id).all()
        for a in acts:
            total += a.cost

    return {"trip_id": trip_id, "total_cost": total}

@app.get("/timeline/{trip_id}")
def timeline(trip_id: int, db: Session = Depends(get_db)):
    data = []

    stops = db.query(models.Stop).filter(models.Stop.trip_id == trip_id).all()
    for stop in stops:
        acts = db.query(models.Activity).filter(models.Activity.stop_id == stop.id).all()
        for a in acts:
            data.append({
                "date": a.date,
                "city": stop.city,
                "activity": a.name,
                "cost": a.cost
            })

    return data
