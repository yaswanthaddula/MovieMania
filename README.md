# 🎬 MovieMania – Firebase-based Movie Ticket Booking Web App

**MovieMania** is a full-featured movie ticket booking web app built using **HTML**, **CSS**, **JavaScript**, and **Firebase**. It allows users to:

✅ Register/Login  
✅ Browse Telugu movies  
✅ Select theaters, date, and seats  
✅ View real-time seat pricing  
✅ Make mock payments  
✅ Receive ticket confirmation with QR  
✅ View booking history (one vote per person)

> 🌙 Fully responsive dark theme  
> 🔥 Powered by Firebase Auth + Firestore + Hosting  

---

## 🌐 Live Demo

🚀 [Click here to view the project](https://movie-ticket-f4cc1.web.app)

⚠️ **Note:** If the browser shows a "Dangerous site" warning:  
1. Click **“Details”**  
2. Then click **“Visit this unsafe site”**  
Your app will open safely. This warning is due to a now-revoked API key previously exposed on GitHub.

---

## 📸 Preview Screens

| Register | Login | Home |
|---------|-------|------|
| ![](https://github.com/yaswanthaddula/MovieMania/blob/main/register.png) | ![](https://github.com/yaswanthaddula/MovieMania/blob/main/login.png) | ![](https://github.com/yaswanthaddula/MovieMania/blob/main/home.png) |

| Booking | Payment | Ticket |
|---------|---------|--------|
| ![](https://github.com/yaswanthaddula/MovieMania/blob/main/booking.png) | ![](https://github.com/yaswanthaddula/MovieMania/blob/main/payment.png) | ![](https://github.com/yaswanthaddula/MovieMania/blob/main/ticket.png) |

| Success | History |
|---------|---------|
| ![](https://github.com/yaswanthaddula/MovieMania/blob/main/success.png) | ![](https://github.com/yaswanthaddula/MovieMania/blob/main/history.png) |

---

## 📁 Project Folder Structure

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
│ ├── index.css
│ ├── register.css
│ ├── login.css
│ ├── home.css
│ ├── booking.css
│ ├── payment.css
│ ├── success.css
│ └── history.css
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
- 🔐 Firebase Authentication (Email/Password)
- 📄 Firebase Firestore (Bookings + Movies)
- 🌍 Firebase Hosting

---

## 🚀 How to Run This Project

### 🔧 1. Clone the Repo

```bash
git clone https://github.com/yaswanthaddula/MovieMania.git
cd MovieMania
🔐 2. Set Up Firebase
Go to Firebase Console

Create a new project

Enable:

Authentication → Sign-in method → Enable Email/Password

Cloud Firestore

Go to Project Settings → Add Web App → Copy config

Paste config into public/scripts/firebase-config.js:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  ...
};
🔒 Firestore Security Rules
In Firestore > Rules, paste and publish this:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /movies/{movieId} {
      allow read: if request.auth != null;
      allow write: if false;
    }

    match /bookings/{bookingId} {
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }

    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}

🧾 Create Firestore Collections
1. users – Auto-created on registration
2. movies – Create manually:
Collection ID: movies
Document ID: any unique name
Fields:
title: string
poster: image URL
language: string
description: string

3. bookings – Created after successful booking
📤 Deploy to Firebase Hosting
npm install -g firebase-tools
firebase login
firebase init hosting
# Select public folder and SPA: Yes
firebase deploy
App goes live at:
🌐 https://your-project-id.web.app

🧠 Features
🎨 Dark responsive UI
🔐 Firebase Auth integration
🎬 Telugu movie selection
🪑 Seat picker with dynamic pricing
🏢 Theater/date selection
💳 Mock payment page
🎟️ Ticket confirmation with QR
📖 Booking history per user

🧠 What's Next?
🔄 Real-time seat availability
💳 Real payment gateway (Razorpay/Stripe)
🛠️ Admin dashboard to add/edit movies
⭐ User movie reviews and ratings

👨‍💻 Developed By
Yaswanth Addula
🎓 B.Tech – AI & Data Science
🏫 Saveetha School of Engineering

📄 License
This project is licensed under the MIT License.

📬 Contact
📧 yaswanthofficial@gmail.com
🔗 GitHub: @yaswanthaddula
