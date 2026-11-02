# 🩸 LifeDrop — Blood Bank Management System (MERN Stack)

[![React](https://img.shields.io/badge/React-19.x-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47a248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)](LICENSE)

**LifeDrop** is a modern, responsive full-stack **Blood Bank Management System** built with **React**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**. It bridges the critical communication gap between certified hospitals, healthcare clinics, voluntary blood donors, and patients in urgent medical need.

---

## 🌟 Key Features

### 🏥 1. Hospital Administration Portal
* **Inventory & Blood Stock Management**: Add, view, and delete certified blood units (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`) with storage compliance verification.
* **Incoming Patient Requests**: Review urgent patient requests with one-click **Accept** or **Reject** actions.
* **Community Donor Search**: Search and filter voluntary donors across cities and send direct emergency donation inquiries.
* **Request Status Tracking**: Real-time status monitoring for all outbound donor inquiries (`Pending`, `Accepted`, `Declined`) with cancellation options.
* **Hospital Profile Settings**: Update hospital name, city, official contact phone number, and password credentials.

### 🩸 2. User & Voluntary Donor Portal
* **Real-Time Blood Search**: Filter and search certified hospital blood stock by blood group and city.
* **One-Click Blood Requests**: Submit blood unit requests directly to partner hospitals.
* **Register as Voluntary Donor**: List your blood type with WHO safety declaration so nearby hospitals can contact you during critical shortages.
* **Donation Inquiry Management**: Accept or decline hospital requests requesting your registered blood group.
* **Live Status Tracking**: Monitor response status (`Accepted`, `Pending Review`, `Rejected`) with cancellation options.
* **Personal Profile Management**: Update phone number, city, blood group, and account security.

### 🌐 3. Public Platform & Emergency Support
* **Blood Compatibility Matrix**: Color-coded donor/recipient guide with universal donor (`O-`) and recipient (`AB+`) highlights.
* **Donor Health & Wellness Tips**: Guidelines based on World Health Organization (WHO) safety criteria.
* **24/7 Emergency Dispatch Helpline**: One-click direct call and email links for emergency medical coordination.
* **Fully Responsive UI**: Modern medical crimson theme with sticky headers, soft pill badges, and mobile drawer navigation.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS, JavaScript (ES6+), Lucide Icons, Font Awesome 6.5.1, Vite |
| **Backend** | Node.js, Express.js, REST API |
| **Database** | MongoDB with Mongoose ODM (Zero-config embedded fallback or MongoDB Atlas/local) |
| **Typography** | Plus Jakarta Sans (Google Fonts) |

---

## 📂 Project Structure

```plaintext
bloodBank/
├── frontend/                 # Modern React + Tailwind CSS client
│   ├── public/               # Application assets, icons, and banners
│   ├── src/
│   │   ├── api/              # Centralized REST API client
│   │   ├── components/       # Navbar, Footer, and Alert notifications
│   │   ├── context/          # AuthContext & BloodBankContext state managers
│   │   ├── pages/            # 18 converted page components
│   │   ├── App.jsx           # Client routes & protected navigation
│   │   ├── index.css         # Tailwind directives & design tokens
│   │   └── main.jsx          # React DOM entry
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Node.js + Express + MongoDB REST API
│   ├── config/               # Database connection handler
│   ├── models/               # Mongoose Schemas (Hospital, Receiver, BloodInfo, etc.)
│   ├── routes/               # Express API endpoints (Auth, Hospital, Receiver, Public)
│   ├── seed/                 # Pre-loaded database seeder mirroring original data
│   ├── server.js             # Express application entry point
│   ├── .env                  # Environment configuration
│   └── package.json
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started & Installation

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm (bundled with Node.js)

### Step 1: Run the Backend Server
```bash
cd backend
npm install
npm start
```
*The backend API server will start on **`http://localhost:5000`** and automatically seed the database with initial accounts and inventory.*

### Step 2: Run the Frontend Application
In a separate terminal window:
```bash
cd frontend
npm install
npm run dev
```
*Open your browser and navigate to **`http://localhost:5173`**.*

---

## 🔐 Demo Credentials (Testing)

You can log in immediately using the pre-seeded accounts:

### 🏥 Hospital Accounts
| Hospital Name | Location | Email | Password |
| :--- | :--- | :--- | :--- |
| **Liaquat National Hospital** | Karachi | `info@lnh.edu.pk` | `gandhi` |
| **Civil Hospital (Dr. Ruth Pfau)** | Karachi | `contact@chk.gov.pk` | `arunodhaya` |
| **LUMHS Civil Hospital** | Hyderabad | `helpdesk@lumhs.edu.pk` | `asia47` |
| **Indus Hospital** | Badin | `badin.campus@tih.org.pk` | `apollo247` |
| **GMMMC Teaching Hospital** | Sukkur | `info@gmmmc.edu.pk` | `amaravathi` |

### 👤 Donor / User Accounts
| Donor Name | Location | Blood Group | Email | Password |
| :--- | :--- | :--- | :--- | :--- |
| **Muhammad Ali Khan** | Karachi | `A+` | `m.ali.khan@gmail.com` | `test` |
| **Tariq Mehmood Soomro** | Hyderabad | `B+` | `tariq.soomro@gmail.com` | `xyz@47` |
| **Zubair Ahmed Memon** | Sukkur | `B+` | `zubair.memon78@gmail.com` | `rithish` |
| **Bilal Hussain Shah** | Larkana | `B+` | `bilal.shah92@gmail.com` | `akshay74` |
| **Ayesha Siddiqa** | Mirpurkhas | `AB-` | `ayesha.siddiqa44@gmail.com` | `nandhu989` |

---

## 📞 Emergency & Project Contact

* **Lead Coordinator**: Muhammad Nazim
* **Phone / Helpline**: [+92 306 3071648](tel:+923063071648)
* **Email**: [nazimpahore8@gmail.com](mailto:nazimpahore8@gmail.com)
* **Location**: Sindh, Pakistan

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
