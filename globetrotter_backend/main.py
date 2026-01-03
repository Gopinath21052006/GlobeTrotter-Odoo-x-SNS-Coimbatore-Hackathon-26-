from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
import models
import uuid
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

@app.get("/stops/{trip_id}")
def get_stops(trip_id: int, db: Session = Depends(get_db)):
    return db.query(models.Stop).filter(models.Stop.trip_id == trip_id).all()


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

@app.get("/share/{trip_id}")
def share(trip_id: int, db: Session = Depends(get_db)):
    trip = db.query(models.Trip).filter(models.Trip.id == trip_id).first()
    stops = db.query(models.Stop).filter(models.Stop.trip_id == trip_id).all()

    result = {
        "trip": trip.name,
        "stops": []
    }

    for s in stops:
        acts = db.query(models.Activity).filter(models.Activity.stop_id == s.id).all()
        result["stops"].append({
            "city": s.city,
            "activities": [{"name": a.name, "cost": a.cost} for a in acts]
        })

    return result


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

@app.get("/user/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    return {"id": user.id, "name": user.name, "email": user.email}

@app.put("/user/{user_id}")
def update_user(user_id: int, name: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    user.name = name
    db.commit()
    return {"message": "Profile updated"}

@app.delete("/user/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db.query(models.User).filter(models.User.id == user_id).delete()
    db.commit()
    return {"message": "User deleted"}
@app.get("/admin/stats")
def admin_stats(db: Session = Depends(get_db)):
    users = db.query(models.User).count()
    trips = db.query(models.Trip).count()
    cities = db.query(models.Stop).count()
    activities = db.query(models.Activity).count()

    return {
        "users": users,
        "trips": trips,
        "cities": cities,
        "activities": activities
    }
@app.get("/admin/popular")
def popular(db: Session = Depends(get_db)):
    cities = db.query(models.Stop.city, db.func.count(models.Stop.city)).group_by(models.Stop.city).all()
    acts = db.query(models.Activity.name, db.func.count(models.Activity.name)).group_by(models.Activity.name).all()

    return {"cities": cities, "activities": acts}

@app.post("/forgot-password")
def forgot_password(email: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return {"message": "If this email exists, reset link sent"}

    token = str(uuid.uuid4())
    user.reset_token = token
    db.commit()

    return {
        "message": "Reset link generated",
        "reset_link": f"http://localhost:5173/reset/{token}"
    }

@app.post("/reset-password")
def reset_password(token: str, new_password: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.reset_token == token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid token")

    user.password = hash_password(new_password)
    user.reset_token = None
    db.commit()
    return {"message": "Password updated"}
