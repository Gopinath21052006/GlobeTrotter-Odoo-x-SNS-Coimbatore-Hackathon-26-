# 🌍 GlobeTrotter  
**Odoo × SNS Coimbatore Hackathon 2026**  
*A Smart Travel Planning & Itinerary Management Platform*

---

## 📌 Overview
**GlobeTrotter** is a full-stack travel planning web application that allows users to plan trips, build itineraries, manage budgets, explore cities, and visualize their journeys using a calendar and timeline view.  
It also includes an **Admin Dashboard** for platform analytics, trends, and user management.

The goal of GlobeTrotter is to provide a **one-stop travel companion** that helps users go from idea → plan → itinerary → budget → memories.

---

## 🧠 Problem We Solve
Travelers often struggle to:
- Organize multiple trips  
- Track budgets  
- Plan daily itineraries  
- Compare destinations  
- Share trips  
- Visualize travel timelines  

GlobeTrotter solves this by offering:
- Structured trip planning  
- Visual timelines  
- Budget analytics  
- Community & sharing  
- Admin-level insights  

---

## 🧰 Tech Stack

### Frontend
- ⚛️ React (Vite)
- React Router
- Custom CSS UI
- Axios for API calls

### Backend
- 🐍 FastAPI
- SQLAlchemy ORM
- Passlib (bcrypt) for authentication

### Database
- 🐘 PostgreSQL 16

---

## ✨ Features

### 👤 User
- Login / Signup
- Profile management
- Create & manage trips
- Add cities and activities
- Build itinerary
- View budget
- Timeline view
- Calendar view (Google-Calendar style)
- Share trips

### 🧭 Trip Management
- Create new trips
- Add stops (cities)
- Add activities with cost
- View trip timeline
- View budget breakdown

### 📅 Calendar View
- Trips shown as events
- Month navigation
- Click event → open trip

### 🌍 Explore
- City suggestions with images
- Activity search
- Regional selections

### 📊 Admin Panel
- Manage users
- View popular cities
- View popular activities
- Platform statistics
- User trends
- Analytics dashboard

---

## 🗂 Project Structure

```

GlobeTrotter/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── TripCreate.jsx
│   │   │   ├── TripPlanner.jsx
│   │   │   ├── Calendar.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── Profile.jsx
│   │   ├── components/
│   │   │   └── Header.jsx
│   │   ├── data/
│   │   │   └── cities.js
│   │   ├── api.js
│   │   └── App.jsx
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   ├── auth.py
│   └── requirements.txt
│
└── README.md

````

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd globetrotter_backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
````

Make sure PostgreSQL is running and your DB connection is configured in `database.py`.

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 🛠 API Routes

| Route                 | Purpose            |
| --------------------- | ------------------ |
| `/signup`             | Create user        |
| `/login`              | Login              |
| `/trips`              | Create trip        |
| `/trips/{user_id}`    | Get user trips     |
| `/stops`              | Add city           |
| `/activities`         | Add activity       |
| `/budget/{trip_id}`   | Budget calculation |
| `/timeline/{trip_id}` | Timeline           |
| `/calendar/{user_id}` | Calendar trips     |
| `/admin/*`            | Admin analytics    |

---

## 🏆 Hackathon Impact

GlobeTrotter is designed as a **startup-ready platform**, not just a demo.

It combines:

* Travel planning
* Visual timelines
* Real-time budgets
* Data analytics
* Admin insights

This makes it ideal for:

* Students
* Travel startups
* Tour operators
* Digital nomads

---

## 👨‍💻 Team

Built by **DETROIT**
For **Odoo × SNS Coimbatore Hackathon 2026**

```

---

