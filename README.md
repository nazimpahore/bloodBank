# 🩸 LifeDrop — Blood Bank Management System (MERN Stack)

[![React](https://img.shields.io/badge/React-19.x-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8.x-47a248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)](LICENSE)

**LifeDrop** is a modern, secure, and responsive full-stack **Blood Bank Management System** built with **React 19**, **Tailwind CSS v4**, **Node.js**, **Express**, and **MongoDB**. 

It streamlines blood donation logistics and emergency requests by bridging the communication gap between certified hospitals, healthcare clinics, voluntary blood donors, and patients in urgent medical need.

---

## 📑 Table of Contents

- [🌟 Key Features](#-key-features)
  - [1. Hospital Administration Portal](#1-hospital-administration-portal)
  - [2. User & Voluntary Donor Portal](#2-user--voluntary-donor-portal)
  - [3. Public Platform & Emergency Support](#3-public-platform--emergency-support)
- [🛡️ Security & Reliability Features](#️-security--reliability-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Quick Start & Installation](#-quick-start--installation)
  - [Prerequisites](#prerequisites)
  - [One-Command Quick Start (Recommended)](#one-command-quick-start-recommended)
  - [Manual Step-by-Step Setup](#manual-step-by-step-setup)
- [⚙️ Environment Configuration](#️-environment-configuration)
- [📡 API Endpoints Overview](#-api-endpoints-overview)
- [👥 Account Types & Registration](#-account-types--registration)
- [📞 Emergency & Project Contact](#-emergency--project-contact)
- [📄 License](#-license)

---

## 🌟 Key Features

### 1. Hospital Administration Portal
* **Inventory & Blood Stock Management**: Add, view, update, and remove certified blood units (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`) with storage compliance verification.
* **Incoming Patient Blood Requests**: Review real-time patient requests with one-click **Accept** or **Reject** decision handling.
* **Community Voluntary Donor Search**: Filter and search registered donors across cities and blood groups to send direct emergency donation requests.
* **Outbound Request Tracking**: Live status monitoring for all outbound donor inquiries (`Pending`, `Accepted`, `Declined`) with cancellation controls.
* **Hospital Profile & Credentials**: Update hospital name, operational city, official contact phone number, and account credentials.

### 2. User & Voluntary Donor Portal
* **Real-Time Blood Stock Search**: Filter certified hospital blood stock by blood group and city.
* **One-Click Blood Requests**: Submit immediate blood unit requests directly to partner hospitals.
* **Voluntary Donor Registration**: Register as a blood donor with WHO safety criteria declaration so nearby hospitals can reach out during shortages.
* **Donation Inquiry Management**: View and respond to blood donation inquiries sent by registered hospitals.
* **Live Status Tracking**: Monitor request status updates (`Accepted`, `Pending Review`, `Rejected`) with cancellation options.
* **Personal Profile Management**: Update phone number, city, registered blood group, and account password.
* **Password Reset**: Self-service secure password recovery flow for users and hospitals.

### 3. Public Platform & Emergency Support
* **Blood Compatibility Matrix**: Interactive visual donor/recipient compatibility guide highlighting universal donor (`O-`) and universal recipient (`AB+`).
* **Donor Health & Wellness Guidelines**: Medical safety advice based on World Health Organization (WHO) donation standards.
* **24/7 Emergency Dispatch Helpline**: Direct call and email links for rapid emergency medical coordination.
* **Fully Responsive UI**: Modern Crimson medical theme built with Tailwind CSS v4, Lucide icons, sticky navigation, and mobile-friendly drawer menu.

---

## 🛡️ Security & Reliability Features

* **Authentication & Authorization**: Stateless JWT (JSON Web Tokens) with secure bcrypt password hashing.
* **Input Validation**: Strict request schema validation powered by **Zod**.
* **Rate Limiting**: IP-based rate limiting via `express-rate-limit` to prevent brute force and abuse.
* **NoSQL Injection Defense**: Sanitization of incoming request payloads via `express-mongo-sanitize`.
* **Security Headers**: Production-grade HTTP headers managed with `helmet`.
* **Zero-Config Database Fallback**: Built-in `mongodb-memory-server` fallback allows running the application instantly without manual MongoDB installation if local daemon is not running.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) |
| **Styling & Icons** | [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) |
| **Routing & Navigation** | [React Router DOM v7](https://reactrouter.com/) |
| **Backend Runtime** | [Node.js](https://nodejs.org/) (ES Modules) |
| **Backend Framework** | [Express.js v4](https://expressjs.com/) (RESTful API) |
| **Database & ODM** | [MongoDB](https://www.mongodb.com/) with [Mongoose v8](https://mongoosejs.com/) |
| **Security & Utilities** | JWT, BcryptJS, Zod, Helmet, Express-Rate-Limit, Express-Mongo-Sanitize |
| **Typography** | Plus Jakarta Sans (Google Fonts) |

---

## 📂 Project Structure

```plaintext
bloodBank/
├── backend/                       # Node.js + Express REST API
│   ├── config/                    # MongoDB connection & fallback setup
│   ├── middleware/                # Auth, Rate-limiting & Zod validation
│   ├── models/                    # Mongoose Schemas (Hospital, Receiver, BloodInfo, etc.)
│   ├── routes/                    # API route handlers (Auth, Hospital, Receiver, Public)
│   ├── seed/                      # Database reset & seeding scripts
│   ├── server.js                  # Express application entry point
│   ├── .env.example               # Backend environment template
│   └── package.json
│
├── frontend/                      # React 19 + Tailwind CSS v4 Client
│   ├── public/                    # Static assets, branding & icons
│   ├── src/
│   │   ├── api/                   # Centralized Axios/Fetch REST API client
│   │   ├── components/            # Reusable UI components (Navbar, Footer, Modals)
│   │   ├── context/               # AuthContext & BloodBankContext state providers
│   │   ├── pages/                 # Full-page views (Dashboards, Requests, Stock, Auth)
│   │   ├── App.jsx                # Application routes & protected route wrappers
│   │   ├── index.css              # Tailwind v4 configuration & theme styles
│   │   └── main.jsx               # React DOM root mounting
│   ├── package.json
│   └── vite.config.js
│
├── package.json                   # Root package manager for concurrent script execution
├── start-dev.bat                  # Windows 1-Click Launch batch script
├── start-dev.ps1                  # Windows PowerShell launch script
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Quick Start & Installation

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [npm](https://www.npmjs.com/) (bundled with Node.js)
* *(Optional)* MongoDB locally installed or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection URI.

---

### One-Command Quick Start (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/bloodBank.git
   cd bloodBank
   ```

2. **Install all dependencies** (root, backend, and frontend in one step):
   ```bash
   npm run install:all
   ```

3. **Start both Backend & Frontend simultaneously**:
   ```bash
   npm run dev
   ```
   *Or on Windows, simply double-click **`start-dev.bat`**.*

   * Frontend will be live at: **`http://localhost:5173`**
   * Backend API will be live at: **`http://localhost:5000`**

---

### Manual Step-by-Step Setup

If you prefer running frontend and backend in separate terminal windows:

#### 1. Setup & Run Backend
```bash
cd backend
npm install
npm run dev
```
*(Server listens on `http://localhost:5000`)*

#### 2. Setup & Run Frontend
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
*(Client runs on `http://localhost:5173`)*

---

## ⚙️ Environment Configuration

Create a `.env` file inside the `backend/` directory by copying `.env.example`:

```bash
cd backend
cp .env.example .env
```

| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/bloodbank` |
| `JWT_SECRET` | Secret key for signing JSON Web Tokens | `your_jwt_secret_key` |
| `ALLOWED_ORIGINS` | Allowed CORS origins (comma-separated) | `http://localhost:5173` |
| `NODE_ENV` | Application environment (`development` / `production`) | `development` |

> **Note:** If `MONGO_URI` is not reachable locally, the application automatically starts an in-memory database fallback so you can test features immediately without any manual database setup.

---

## 📡 API Endpoints Overview

### Public Routes (`/api/public`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/public/blood-stock` | Search certified blood inventory across hospitals |
| `GET` | `/api/public/community-donors` | Search registered voluntary donors by city & group |

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register-hospital` | Register a new hospital account |
| `POST` | `/api/auth/login-hospital` | Hospital login & JWT issuance |
| `POST` | `/api/auth/register-receiver` | Register a new user/donor account |
| `POST` | `/api/auth/login-receiver` | User/donor login & JWT issuance |
| `POST` | `/api/auth/forgot-password` | Request password reset token |
| `POST` | `/api/auth/reset-password` | Complete password reset |

### Hospital Routes (`/api/hospital`) *(Protected)*
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/hospital/stock` | View hospital's blood stock inventory |
| `POST` | `/api/hospital/stock` | Add certified blood unit to inventory |
| `DELETE` | `/api/hospital/stock/:id` | Remove blood unit from inventory |
| `GET` | `/api/hospital/requests` | List patient requests received |
| `PUT` | `/api/hospital/requests/:id` | Update request status (Accept / Reject) |
| `POST` | `/api/hospital/donor-inquiry` | Send donation inquiry to a community donor |
| `GET` | `/api/hospital/donor-status` | Track status of outbound donor inquiries |
| `GET/PUT` | `/api/hospital/profile` | View or update hospital details & credentials |

### Receiver / Donor Routes (`/api/receiver`) *(Protected)*
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/receiver/request-blood` | Submit urgent blood unit request to hospital |
| `GET` | `/api/receiver/my-requests` | View status of personal blood requests |
| `POST` | `/api/receiver/register-donor` | Register as voluntary community donor |
| `GET` | `/api/receiver/donor-status` | View incoming hospital donation requests |
| `PUT` | `/api/receiver/donor-status/:id` | Accept or decline hospital donation request |
| `GET/PUT` | `/api/receiver/profile` | View or update user profile and blood group |

---

## 👥 Account Types & Registration

LifeDrop offers a clean dual-role onboarding flow:

1. **🏥 Hospital / Healthcare Clinic**:
   - Navigate to **Register &rarr; Hospital / Clinic**.
   - Fill in: Hospital Name, City, Official Phone Number, Email, and Password.
   - Access the full inventory management and donor request dispatch system.

2. **🩸 Individual User / Voluntary Donor**:
   - Navigate to **Register &rarr; User / Donor**.
   - Fill in: Full Name, Blood Group (`A+`, `O-`, etc.), City, Phone Number, Email, and Password.
   - Request blood for emergencies or register to donate blood to save lives.

---

## 📞 Emergency & Project Contact

* **Lead Developer & Coordinator**: Muhammad Nazim
* **Helpline / Phone**: [+92 306 3071648](tel:+923063071648)
* **Email**: [nazimpahore8@gmail.com](mailto:nazimpahore8@gmail.com)
* **Location**: Sindh, Pakistan

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
