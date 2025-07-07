# 🌪️ Disaster Response Coordination Platform

A full-stack platform to coordinate disaster response by aggregating user-submitted disaster data, social media reports, and location-based resources in real-time.

---

## 📌 Project Objective

Build a backend-heavy MERN-stack app that:

- Manages disaster records (CRUD)
- Fetches real-time social media (via mock Twitter API)
- Queries Supabase geospatial data (for resources/shelters)
- Verifies disaster images via basic placeholder (mock implementation)
- Displays all this data with real-time WebSocket updates

---

## 💻 Tech Stack

| Layer         | Technology                          |
|---------------|--------------------------------------|
| Frontend      | React + Vite + Tailwind CSS          |
| Backend       | Node.js + Express.js + Socket.IO     |
| Database      | Supabase (PostgreSQL + PostGIS)      |
| Social Media  | Mock Twitter API                     |
| Hosting       | Vercel (Frontend) + Render (Backend) |

---

## 🚀 Live Deployment

- **Frontend (Vercel)**: https://your-vercel-url.vercel.app  
- **Backend (Render)**: https://your-backend-url.onrender.com

---

## 📁 Folder Structure

```
.
├── backend/
│   ├── index.js
│   ├── routes/
│   ├── utils/
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── index.html
│   └── vite.config.js
└── README.md
```

---

## 🧩 Features

### ✅ 1. Disaster Data Management
- `POST /disasters`
- `GET /disasters?tag=flood`
- `PUT /disasters/:id`
- `DELETE /disasters/:id`

### ✅ 2. Real-Time Social Media Monitoring
- `GET /disasters/:id/social-media`  
  Fetches posts from **mock Twitter API**

### ✅ 3. Geospatial Resource Mapping
- `GET /disasters/:id/resources?lat=...&lon=...`  
  Uses Supabase `ST_DWithin()` to find resources within 10km

### ✅ 4. Official Updates
- `GET /disasters/:id/official-updates`  
  Scrapes **FEMA/Red Cross** news using Cheerio

### ✅ 5. Image Verification (Mock)
- `POST /disasters/:id/verify-image`  
  Placeholder endpoint for demo purposes

### ✅ 6. Real-time WebSocket Push
- `disaster_updated` on create/update/delete
- `social_media_updated` on new posts
- `resources_updated` on new resources

---

## 🗃️ Supabase Tables

| Table     | Fields                                                                 |
|-----------|------------------------------------------------------------------------|
| disasters| id, title, location_name, location (GEOGRAPHY), description, tags[]     |
| reports   | id, disaster_id, user_id, content, image_url, verification_status      |
| resources | id, disaster_id, name, location_name, location (GEOGRAPHY), type       |
| cache     | key, value (JSONB), expires_at                                         |

Indexes:
- `GIST` on `location`
- `GIN` on `tags`
- `BTREE` on `owner_id`

---

## ⚙️ How to Run Locally

### Backend
```bash
cd backend
cp .env.example .env
npm install
node index.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open browser at `http://localhost:5173`

---

## 📬 Mock Authentication

Used hardcoded user roles:
- `netrunnerX` (admin)
- `reliefAdmin` (contributor)

Used in requests via payload fields like `owner_id`.

---

## 🧠 Cursor & Windsurf Usage

✅ Used **Cursor** to:
- Generate REST API boilerplate
- Scaffold Supabase geospatial queries and caching logic

✅ Used **Windsurf** to:
- Generate Tailwind frontend with fetch calls
- Mock social media API
- Auto-wire real-time Socket.IO events

Mentioned tools as required for vibe coding.

---



## 📨 Submission Checklist

- ✅ GitHub Repo: [https://github.com/RamakanthRGunishetty/Disaster-Response-Coordination-Platform/](https://github.com/RamakanthRGunishetty/Disaster-Response-Coordination-Platform/)
- ✅ Live Frontend (Vercel)
- ✅ Live Backend (Render)
- ✅ Zip of frontend + backend
- ✅ Mentioned Cursor/Windsurf in README
- ✅ Submission email sent to [insert email]

---

## 🧪 Sample Test Data

```json
{
  "title": "NYC Flood",
  "location_name": "Manhattan, NYC",
  "description": "Heavy flooding in Manhattan",
  "tags": ["flood", "urgent"],
  "owner_id": "netrunnerX"
}
```

```json
{
  "disaster_id": "123",
  "user_id": "citizen1",
  "content": "Need food in Lower East Side",
  "image_url": "http://example.com/flood.jpg"
}
```

```json
{
  "disaster_id": "123",
  "name": "Red Cross Shelter",
  "location_name": "Lower East Side, NYC",
  "location": { "type": "Point", "coordinates": [ -74.001, 40.715 ] },
  "type": "shelter"
}
```

---

## 🎉 Thank You

Thank you for reviewing this project. The app is ready to coordinate disaster response using real-time and geospatial intelligence.
