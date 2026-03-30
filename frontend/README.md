# CivicEvents Frontend

A web app for browsing events, listening to announcements, watching promos, registering for events, and leaving feedback. Built with HTML, Tailwind CSS, and JavaScript.

Frontend runs on: **http://localhost:3000**  
Backend API runs on: **http://localhost:4000/api**

## Getting Started

### Step 1: Start the Backend
```bash
cd backend
npm run dev
```

### Step 2: Start the Frontend
```bash
cd frontend
python3 -m http.server 3000
```

### Step 3: Open in Browser
Visit: **http://localhost:3000**

Test accounts are seeded in the backend. Check the **backend README** for login credentials.

## Change Backend URL

If your backend runs on a different URL, edit:
```
frontend/js/config.js
```

Find this line:
```javascript
const API_BASE_URL = "http://localhost:4000/api";
```

Change it to your backend URL.

## Features
- Sign up and login with secure passwords
- Browse events and register
- Leave feedback and ratings
- Listen to announcements with transcripts
- Watch videos with captions
- Admin dashboard to manage content
- Update your user profile
