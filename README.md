# 🎬 MovieMania – Firebase-based Movie Ticket Booking Web App

MovieMania is a fully functional movie ticket booking website built with **HTML**, **CSS**, **JavaScript**, and **Firebase**. The app allows users to:

✅ Register/Login  
✅ Browse Telugu movies  
✅ Book seats with real-time price updates  
✅ Choose nearby theaters and date  
✅ Make mock payments  
✅ View booking history  
✅ Receive booking confirmation with a QR ticket

> 📱 Fully responsive + Dark theme for modern look

---

## 🌐 Live Demo

🚀 [Click here to view the project live](https://movie-ticket-f4cc1.web.app/)

---

---

## 📁 Project Folder Structure

```bash
MovieMania/
├── firebase.json
├── .firebaserc
├── README.md
└── public/
    ├── index.html
    ├── register.html
    ├── login.html
    ├── home.html
    ├── booking.html
    ├── payment.html
    ├── success.html
    ├── history.html
    ├── css/
    │   ├── index.css
    │   ├── register.css
    │   ├── login.css
    │   ├── home.css
    │   ├── booking.css
    │   ├── payment.css
    │   ├── success.css
    │   └── history.css
    └── scripts/
        ├── firebase-config.js
        ├── register.js
        ├── login.js
        ├── home.js
        ├── booking.js
        ├── payment.js
        ├── success.js
        └── history.js

---

## 🧰 Technologies Used

- 🌐 HTML, CSS, JavaScript (Frontend)
- 🔐 Firebase Authentication
- 🧠 Firebase Firestore (Database)
- ☁️ Firebase Hosting

---

## 📸 Screenshots

| 📥 Register Page | 🔐 Login Page |
|------------------|------------------|
| ![Register](https://raw.githubusercontent.com/yaswanthaddula/MovieMania/main/register.png) | ![Login](https://raw.githubusercontent.com/yaswanthaddula/MovieMania/main/login.png) |

| 🏠 Home (Movies List) | 🎟️ Booking (Seats) |
|------------------------|------------------------|
| ![Home](https://raw.githubusercontent.com/yaswanthaddula/MovieMania/main/home.png) | ![Booking](https://raw.githubusercontent.com/yaswanthaddula/MovieMania/main/booking.png) |

| 💳 Payment Page | ✅ Booking Success |
|------------------|----------------------|
| ![Payment](https://raw.githubusercontent.com/yaswanthaddula/MovieMania/main/payment.png) | ![Success](https://raw.githubusercontent.com/yaswanthaddula/MovieMania/main/success.png) |

| 📜 Booking History | 🎫 Ticket with QR |
|---------------------|---------------------|
| ![History](https://raw.githubusercontent.com/yaswanthaddula/MovieMania/main/history.png) | ![Ticket](https://raw.githubusercontent.com/yaswanthaddula/MovieMania/main/ticket.png) |

---

## 🚀 Getting Started – Build This in 5 Steps!

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yaswanthaddula/MovieMania.git
cd MovieMania
2️⃣ Create Firebase Project
Go to Firebase Console

Create a project → Enable Email/Password Authentication

Create a Firestore Database

Go to Project Settings → Get Firebase Config

3️⃣ Add Your Firebase Config
Edit public/scripts/firebase-config.js like below:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};
4️⃣ Install Firebase CLI and Deploy
npm install -g firebase-tools
firebase login
firebase init
# Choose: Hosting → Select your project → Public directory: public → SPA: Yes
firebase deploy
✅ That’s it! Your project is now live!

🔧 Features Summary
Feature	Description
🔐 Login/Register	Secure user authentication using Firebase
🎞️ Movie List	Browse Telugu movies with posters
🎟️ Seat Booking	Clickable seat layout with live pricing
🏨 Theater & Date	Select theater and showtime
💳 Mock Payment	Choose Net Banking, UPI, etc.
✅ QR Confirmation	Booking confirmation with downloadable QR ticket
📜 History	View past booking details for the logged-in user


🧠 What's Next?
🔄 Real-time seat availability
💳 Integrate real payment gateway (Razorpay/Stripe)
🛠️ Admin dashboard to add movies
⭐ User movie reviews and ratings
