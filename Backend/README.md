# 💰 Personal Finance Tracker - Backend

This repository contains the **backend API** for the Full Stack Personal Finance Tracker application. It is built using **Node.js**, **Express.js**, **TypeORM**, and **PostgreSQL**, with **Redis** for caching and **JWT authentication** for security. The project also implements **Role-Based Access Control (RBAC)** for fine-grained permissions.

---

## 📚 Table of Contents

- [✨ Features](#-features)  
- [🛠 Tech Stack](#-tech-stack)  
- [📦 Prerequisites](#-prerequisites)  
- [⚙️ Setup & Installation](#-setup--installation)  
- [🔐 Environment Variables](#-environment-variables)  
- [🗄️ Database Setup](#-database-setup)  
- [🚀 Running the Server](#-running-the-server)  
- [📡 API Endpoints](#-api-endpoints)  
- [🔑 Authentication & Roles](#-authentication--roles)  
- [⚡ Caching & Rate Limiting](#-caching--rate-limiting)  
- [🧪 Testing with Postman](#-testing-with-postman)  
- [📁 Project Structure](#-project-structure)  
- [🤝 Contributing](#-contributing)  
- [📄 License](#-license)

---

## ✨ Features

- 🔐 **User Management**: Register, login, update, delete users  
- 🛡 **Role-Based Access Control (RBAC)**: Admin, User, Read-only roles  
- 💸 **Transaction Management**: Add, edit, delete, and view income & expenses  
- 🗂 **Category Management**: CRUD operations for categories  
- 📊 **Analytics Endpoints** *(Optional, expandable)*  
- 🔒 **JWT Authentication** for route protection  
- ⚡ **Redis Caching** for performance optimization  
- 📉 **API Rate Limiting** with `express-rate-limit`  
- ✅ **Validation** using `class-validator`  
- 🧩 **Clean Architecture** using `TypeDI` and `routing-controllers`

---

## 🛠 Tech Stack

- **Node.js** + **Express.js**
- **TypeScript**
- **TypeORM** (PostgreSQL ORM)
- **PostgreSQL** (Database)
- **Redis** (Cache)
- **JWT** (Authentication)
- **routing-controllers**, **typedi** (Routing & DI)
- **class-validator** (Validation)

---

## 📦 Prerequisites

Ensure the following are installed:

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)

---

## ⚙️ Setup & Installation

### 🔁 Clone the Repository

```bash
git clone <repo-url>
cd <repo-folder>/Backend
