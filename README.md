# 🩸 LifeDrop — Blood Bank Management System

[![PHP Version](https://img.shields.io/badge/PHP-7.4%20|%208.x-777bb4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479a1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-4.5.3-7952b3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![FontAwesome](https://img.shields.io/badge/Font%20Awesome-6.5.1-528dd7?style=for-the-badge&logo=font-awesome&logoColor=white)](https://fontawesome.com/)
[![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)](LICENSE)

**LifeDrop** is a modern, responsive full-stack **Blood Bank Management System** developed in PHP and MySQL. It bridges the critical communication gap between certified hospitals, healthcare clinics, voluntary blood donors, and patients in urgent medical need.

---

## 🌟 Key Features

### 🏥 1. Hospital Administration Portal
* **Inventory & Blood Stock Management**: Add, update, and delete available blood groups (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`).
* **Incoming Patient Requests**: Review urgent patient requests with one-click **Accept** or **Reject** actions.
* **Community Donor Search**: Search and filter voluntary donors across cities in Sindh and request immediate emergency blood samples.
* **Request Status Tracking**: Real-time status monitoring for all outbound donor inquiries (`Pending`, `Accepted`, `Declined`).
* **Hospital Profile Settings**: Update hospital name, city, official contact phone number, and password credentials.

### 🩸 2. User & Voluntary Donor Portal
* **Real-Time Blood Search**: Filter and search certified hospital blood stock by blood group and city.
* **One-Click Blood Requests**: Submit blood unit requests directly to partner hospitals.
* **Register as Voluntary Donor**: List your blood type so nearby hospitals can contact you during critical shortages.
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
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), Bootstrap 4.5.3, Font Awesome 6.5.1 |
| **Typography** | Plus Jakarta Sans (Google Fonts) |
| **Backend** | PHP 7.4 / 8.x |
| **Database** | MySQL / MariaDB |
| **Server Environment** | Apache (XAMPP / WAMP / LAMP) |

---

## 🚀 Getting Started & Installation

Follow these steps to run the project locally on your machine:

### Prerequisites
* [XAMPP](https://www.apachefriends.org/) (Apache + MySQL + PHP)
* Git (Optional, for cloning)

### Step 1: Clone or Place the Repository
Place the project folder into your XAMPP web root directory:
```bash
# Using Git
cd C:\xampp\htdocs
git clone https://github.com/YOUR-USERNAME/bloodBank.git
```
*(Or extract the ZIP directly into `C:\xampp\htdocs\bloodBank`)*

### Step 2: Start XAMPP Services
1. Open the **XAMPP Control Panel**.
2. Click **Start** for **Apache**.
3. Click **Start** for **MySQL**.

### Step 3: Import the Database
1. Open your browser and go to **[http://localhost/phpmyadmin](http://localhost/phpmyadmin)**.
2. Click on **New** in the left sidebar to create a database.
3. Set the database name to: **`bloodbank`** and click **Create**.
4. Select the newly created `bloodbank` database, then click the **Import** tab at the top.
5. Click **Choose File**, select `sql/bloodbank.sql` from the project folder, and click **Import** (or **Go**).

### Step 4: Access the Website
Open your web browser and navigate to:
```
http://localhost/bloodBank/main.php
```

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

## 📂 Project Structure

```plaintext
bloodBank/
├── css/
│   ├── style.css             # Main modern UI stylesheet & design system
│   └── styles.css            # Helper media styling
├── file/
│   ├── connection.php        # MySQL database connection handler
│   ├── hospitalLogin.php     # Hospital authentication logic
│   ├── hospitalReg.php       # Hospital registration handler
│   ├── receiverLogin.php     # Donor/User authentication logic
│   ├── receiverReg.php       # Donor/User registration handler
│   ├── infoAdd.php           # Add hospital blood stock
│   ├── infoAddd.php          # Add voluntary donor sample
│   ├── delete.php            # Delete hospital stock item
│   ├── deleted.php           # Delete donor sample listing
│   ├── request.php           # Patient request blood from hospital
│   ├── requestd.php          # Hospital request sample from donor
│   ├── accept.php / reject.php     # Hospital accept/reject patient requests
│   ├── acceptd.php / rejectd.php   # Donor accept/reject hospital inquiries
│   ├── cancel.php / canceld.php    # Request cancellation handlers
│   └── updateprofile.php     # Profile update handler
├── image/                    # Application icons, medical illustrations & banners
├── sql/
│   └── bloodbank.sql         # Database schema and seed data
├── head.php                  # Shared HTML <head> with fonts, Bootstrap & CSS
├── header.php                # Context-aware sticky navigation bar
├── footer.php                # Modern 4-column footer component
├── message.php               # System alert & notification component
├── main.php                  # Public landing homepage
├── index.php                 # Blood compatibility matrix & health tips
├── about.php                 # Mission, values & platform background
├── contact.php               # Lead coordinator contact & emergency helpline
├── login.php                 # Unified tabbed login portal
├── register.php              # Unified tabbed registration portal
├── hospitalpage.html         # Hospital administrative dashboard
├── Userpage.html             # Donor / User personal dashboard
├── abs.php                   # Available hospital blood search
├── deleteit.php              # Available community donor directory
├── bloodinfo.php             # Hospital blood stock management
├── blooddinfo.php            # Voluntary donor sample registration
├── bloodrequest.php          # Incoming blood requests (Hospital view)
├── sentrequest.php           # Outbound blood requests (User view)
├── sentrequestd.php          # Outbound donor inquiries (Hospital view)
├── blooddonate.php           # Inbound donation inquiries (User view)
├── hprofile.php              # Hospital profile settings
├── rprofile.php              # User profile settings
└── logout.php                # Session termination
```

---

## 📞 Emergency & Project Contact

* **Lead Coordinator**: Muhammad Nazim
* **Phone / Helpline**: [+92 306 3071648](tel:+923063071648)
* **Email**: [nazimpahore8@gmail.com](mailto:nazimpahore8@gmail.com)
* **Location**: Sindh, Pakistan

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
