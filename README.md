# Prescripto

A full‑stack medical appointment platform with separate user (frontend), admin dashboard, and backend API.

### Monorepo structure
- `backend/`: Node.js + Express + MongoDB API
- `frontend/`: Patient/user web app (Vite + React + Tailwind)
- `admin/`: Admin dashboard (Vite + React + Tailwind)

### Prerequisites
- Node.js 18+ and npm 9+
- A MongoDB instance (Atlas or local)
- Cloudinary account (for image uploads)

### Environment variables
Create a `.env` file in `backend/` with:
```
PORT=4000
MONGODB_URI=<your_mongodb_connection_string_without_db_name>
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
JWT_SECRET=<a_secure_random_string>
```
Notes:
- Database name `prescripto` is appended in code, so provide the base connection string (without a trailing slash is fine).
- Default API port is 4000.

### Install dependencies
Run these in parallel or one by one:
```bash
cd backend && npm i
```
```bash
cd frontend && npm i
```
```bash
cd admin && npm i
```

### Run in development
In three terminals:
```bash
# Backend (http://localhost:4000)
cd backend && npm run server
```
```bash
# Frontend (user app, Vite dev server)
cd frontend && npm run dev
```
```bash
# Admin (dashboard, Vite dev server)
cd admin && npm run dev
```
Vite picks available ports (commonly 5173 for `frontend` and 5174 for `admin`).

### Production build
```bash
cd frontend && npm run build
cd admin && npm run build
```
- Static builds output to `frontend/dist/` and `admin/dist/`.
- Start the API server:
```bash
cd backend && npm start
```

### API overview
- Base URL: `http://localhost:4000`
- Routers:
  - `GET /api/user/...`
  - `GET /api/admin/...`
  - `GET /api/doctor/...`

### Tech stack
- Backend: Express 5, Mongoose 8, JWT, Multer, Cloudinary, Razorpay
- Frontend/Admin: React 19, React Router 7, Tailwind CSS, Vite

### Common scripts
- Backend: `npm run server` (dev with nodemon), `npm start` (prod)
- Frontend/Admin: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`

### Troubleshooting
- Ensure `.env` exists in `backend/` and values are correct.
- If MongoDB fails: verify `MONGODB_URI` and that the `prescripto` DB is reachable.
- If Cloudinary uploads fail: confirm Cloudinary credentials.
- CORS: API enables CORS; if requests fail, recheck the API base URL in the clients.

### License
This project is for educational/demo purposes. Adjust as needed for production use. 