## Prescripto – Patient, Doctor, and Admin Portal

Full‑stack appointment booking platform with three apps:
- frontend: Patient‑facing React app
- admin: Admin dashboard for managing doctors and appointments
- backend: Node/Express API with MongoDB, Cloudinary, and Razorpay

### Features
- Patient signup/login, profile, and appointment booking/cancelation
- Browse doctors by specialty, availability, and details
- Admin: add doctors, toggle availability, view dashboards and appointments
- Payments (Razorpay order creation wired on backend)

### Tech Stack
- React 19 + Vite, React Router, TailwindCSS, React‑Toastify
- Node.js (ESM), Express 5, Mongoose 8
- Cloudinary for image uploads, Multer for file handling
- JWT auth for users and admin
- Razorpay for payments

### Monorepo Layout
- `frontend/`: Patient UI
- `admin/`: Admin UI
- `backend/`: API and business logic

### Prerequisites
- Node.js 18+ and npm
- MongoDB connection string
- Cloudinary account (cloud name, key, secret)
- Razorpay keys (optional for payment flows)




Default dev ports:
- Frontend: 5173
- Admin: 5173 (adjust one app’s port if both run together) – change `server.port` in each `vite.config.js`
- Backend: 4000

### Production Builds
```
cd frontend && npm run build
cd admin && npm run build
```
Outputs in `dist/` for each app.

### API Overview (backend)
- `POST /api/user/register` – signup
- `POST /api/user/login` – login
- `GET /api/user/get-profile` – auth user profile
- `POST /api/user/update-profile` – auth + image upload
- `POST /api/user/book-appointment` – book
- `GET /api/user/appointments` – list
- `POST /api/user/cancel-appointment` – cancel
- `POST /api/user/payment-razorpay` – create order (ensure keys)

- `GET /api/doctor/list` – public doctor list

- `POST /api/admin/login` – admin login
- `POST /api/admin/add-doctor` – auth + image upload
- `POST /api/admin/all-doctors` – list
- `POST /api/admin/change-availability` – toggle
- `GET /api/admin/appointments` – list
- `POST /api/admin/cancel-appointment` – cancel
- `GET /api/admin/dashboard-data` – metrics

Auth headers:
```
Authorization: Bearer <token>   # or header 'token' used by current code
```

### Notes and Gotchas
- MongoDB URI: backend appends `/prescripto` in `config/mongodb.js`. Provide base URI without the database name.
- File uploads: `add-doctor` expects field name `img`; `update-profile` expects `image`.
- Case sensitivity: Ensure import paths match file names exactly, especially on Linux.
- Ports: If running both `frontend` and `admin` simultaneously, set different `server.port` in each `vite.config.js`.
- Payments: The Razorpay flow currently creates an order; complete capture/verification on the client as needed.

### Scripts
- Backend: `npm run server` (nodemon), `npm start` (node)
- Frontend/Admin: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`
