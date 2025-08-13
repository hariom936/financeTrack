Finance-Tracker folder Structure

src/
├── api/               # API call modules
│   └── user.js
├── components/        # Shared UI components (e.g., LoginForm, UserTable)
│   ├── LoginForm.jsx
│   └── UserTable.jsx
├── context/           # Auth context for global user state
│   └── AuthContext.jsx
├── pages/             # Page-level components
│   ├── Login.jsx
│   └── UserList.jsx
├── router/            # Route protection, navigation
│   └── AppRouter.jsx
├── App.jsx            # Root component
└── main.jsx           # Entry point
.env.local             # Environment variables (VITE_ prefix required)
