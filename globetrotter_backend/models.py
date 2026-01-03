from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)

class Trip(Base):
    __tablename__ = "trips"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    start_date = Column(Date)
    end_date = Column(Date)

class Stop(Base):
    __tablename__ = "stops"
    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"))
    city = Column(String)
    start_date = Column(Date)
    end_date = Column(Date)

class Activity(Base):
    __tablename__ = "activities"
    id = Column(Integer, primary_key=True, index=True)
    stop_id = Column(Integer, ForeignKey("stops.id"))
    name = Column(String)
    cost = Column(Float)
    date = Column(Date)
