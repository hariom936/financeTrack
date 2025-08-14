# 💰 Personal Finance Tracker — Frontend

A responsive, role‑based dashboard for managing finances, built with **React + TypeScript + TailwindCSS**.  
Part of the Full Stack Personal Finance Tracker. This **frontend** works with the backend API to handle authentication, transactions, categories, and analytics.

---

## 🚀 Overview
- **React 18 + Vite** single-page frontend.
- **JWT Authentication** with role-based access control (**Admin**, **User**, **Read‑Only**).
- **Responsive UI** styled with TailwindCSS.
- **Charts** (Recharts) for analytics.
- Integrated with backend API (`/api/...`) for full CRUD operations.

---

## ✨ Features

### 🔐 Authentication
- User registration & login
- JWT stored securely in `localStorage`
- Auto‑redirect after login

### 📂 Modules
- **Dashboard** — analytics charts:
  - Income vs Expense (bar chart)
  - Spending by Category (pie chart)
  - Monthly Trends (line chart)
- **Transactions** — list + CRUD for allowed roles
- **Categories** — list + CRUD for allowed roles
- **Navbar** — dynamic menu based on logged‑in role

---

## 🗝️ Role Permissions

| Feature / Action             | Admin | User | Read‑Only |
|------------------------------|:-----:|:----:|:---------:|
| Register / Login / Logout    | ✔     | ✔    | ✔         |
| View Categories              | ✔     | ✔    | ✔         |
| Add/Edit/Delete Categories   | ✔     | ✔    | ✖         |
| View Transactions            | ✔     | ✔    | ✔ (own only) |
| Add/Edit/Delete Transactions | ✔ (all) | ✔ (own) | ✖         |
| View Analytics (all data)    | ✔     | ✖    | ✖         |
| View Analytics (own data)    | ✔     | ✔    | ✔         |
| Manage Users & Roles         | ✔     | ✖    | ✖         |

---

## 🛠️ Tech Stack
- **React 18 + Vite**
- **TypeScript**
- **TailwindCSS**
- **React Router v6**
- **Recharts** (charts & graphs)
- **Axios** (API requests)
- **Context API** (auth state)

---

## 📂 Folder Structure

frontend/
├── src/
│ ├── api/ # Axios instance config
│ ├── components/ # Navbar, ProtectedRoute, shared UI
│ ├── context/ # AuthContext
│ ├── pages/ # Login, Register, Dashboard(Charts), Transactions, Categories
│ ├── App.tsx # Routes
│ ├── main.tsx # Entry point
│ └── index.css # Tailwind imports
├── package.json
└── tailwind.config.js


---

## ⚙️ Environment Variables
Create `.env` in the `frontend/` root:
VITE_API_BASE_URL=http://localhost:8000/api


⚠ Make sure this matches your backend server URL & port.

---

## 📦 Setup & Run

**1. Clone the repo**
git clone https://github.com/hariom936/financeTrack/tree/main/frontend
cd finance-tracker/frontend


**2. Install dependencies**
npm install

**3. Run in dev mode**
npm run dev

Dev server runs on `http://localhost:5173`

**4. Build for production**
npm run build


---

## 🔗 API Endpoints Expected

**Auth**
- `POST /api/user/add` – Register
- `POST /api/user/login` – Login

**Categories**
- `GET /api/category/list`
- `POST /api/category/add`
- `PUT /api/category/update?id=`
- `DELETE /api/category/delete?id=`

**Transactions**
- `GET /api/transaction/list`
- `POST /api/transaction/add`
- `PUT /api/transaction/update/:id`
- `DELETE /api/transaction/delete/:id`

**Analytics**
- `GET /api/analytics/income-vs-expense`
- `GET /api/analytics/spending-by-category`
- `GET /api/analytics/monthly-trend`

---

## 📝 License
Hariom Verma FTA

