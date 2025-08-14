# 💰 Personal Finance Tracker — Backend

This is the **backend API** for the Full Stack Personal Finance Tracker.  
Built with **Node.js + TypeScript + Express + TypeORM + PostgreSQL**, it provides a secure REST API for authentication, category & transaction management, and analytics.

---

## 🚀 Overview
- **Node.js + Express** API server
- **TypeScript** for type safety
- **PostgreSQL** database with **TypeORM**
- **JWT Authentication** & **RBAC (Admin, User, Read‑Only)**
- **REST API** for frontend consumption
- **Analytics endpoints** for dashboard charts

---

## ✨ Features

### 🔐 Authentication
- JWT‑based login
- Role‑based access control (RBAC)
- Secure password hashing with bcrypt
- Environment‑based config

### 📂 Modules
- **User Management** — register, login, manage roles
- **Categories** — CRUD (limited by role)
- **Transactions** — CRUD (limited by role)
- **Analytics** — income vs expense, spending by category, monthly trends
- **File uploads** (if needed for category/transaction receipts)
- Global error handling & request validation

---

## 🗝️ Role Permissions

| Feature / Action             | Admin | User | Read‑Only |
|------------------------------|:-----:|:----:|:---------:|
| Register / Login             | ✔     | ✔    | ✔         |
| View All Categories          | ✔     | ✔    | ✔         |
| Add/Edit/Delete Categories   | ✔     | ✔    | ✖         |
| View Transactions            | ✔     | ✔    | ✔ (own only) |
| Add/Edit/Delete Transactions | ✔ (all) | ✔ (own) | ✖         |
| View Analytics (all data)    | ✔     | ✖    | ✖         |
| View Analytics (own data)    | ✔     | ✔    | ✔         |
| Manage Users & Roles         | ✔     | ✖    | ✖         |

---

## 🛠️ Tech Stack
- **Node.js** with **Express**
- **TypeScript**
- **TypeORM** (PostgreSQL)
- **routing-controllers** for decorators
- **typedi** for dependency injection
- **class-validator** & **class-transformer**
- **bcrypt** for password hashing
- **jsonwebtoken** for JWT
- **Helmet**, **CORS**, **Compression** for security & performance
- **Winston**/**Morgan** for logging

---

## 📂 Folder Structure
backend/
├── src/
│ ├── config/ # DB config, environment config
│ ├── controllers/ # Route controllers (user, category, transaction, analytics)
│ ├── entity/ # TypeORM entities
│ ├── middleware/ # Custom middlewares
│ ├── services/ # Business logic services
│ ├── utils/ # Helper functions
│ ├── index.ts # App entry point
├── appData/img/ # Static image storage
├── package.json
├── tsconfig.json
├── ormconfig.ts # TypeORM connection settings
└── .env.example # Example env vars

---

## ⚙️ Environment Variables

Create `.env.local` for development:

NODE_ENV=local
PORT=8000

Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_pg_username
DB_PASSWORD=your_pg_password
DB_DATABASE=finance_db

JWT
JWT_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRATION=15m

CORS
CORS_ORIGIN=http://localhost:5173

## 📦 Installation & Run

**1. Clone the repo**
git clone https://github.com/hariom936/financeTrack/tree/main/Backend
cd finance-tracker/backend

**2. Install dependencies**
npm install

**3. Setup environment**
- Create `.env.local` (see above)

**4. Run migrations (if any)**
npm run migration:run

**5. Start in dev mode**
npm run serve
Server starts at:http://localhost:8000


---

## 🔗 API Endpoints

### **Auth**
- `POST /api/user/add` — register new user
- `POST /api/user/login` — login

### **Categories**
- `GET /api/category/list`
- `POST /api/category/add` *(admin/user)*
- `PUT /api/category/update?id=`
- `DELETE /api/category/delete?id=`

### **Transactions**
- `GET /api/transaction/list`
- `POST /api/transaction/add` *(admin/user)*
- `PUT /api/transaction/update/:id`
- `DELETE /api/transaction/delete/:id`

### **Analytics**
- `GET /api/analytics/income-vs-expense`
- `GET /api/analytics/spending-by-category`
- `GET /api/analytics/monthly-trend`

---

## 🛡️ Security
- All sensitive routes require JWT in `Authorization: Bearer <token>`
- Role checks enforced server‑side via `@Authorized([roles])`
- CORS configured to allow only the frontend origin in development

---

## 📝 License
Hariom Verma - FTA - Backend

---
