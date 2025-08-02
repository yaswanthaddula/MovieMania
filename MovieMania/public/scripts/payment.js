import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDshddADOSygf_pQggIEb5xHuNw6jWCZXQ",
  authDomain: "movie-ticket-f4cc1.firebaseapp.com",
  projectId: "movie-ticket-f4cc1",
  storageBucket: "movie-ticket-f4cc1.appspot.com",
  messagingSenderId: "435762380379",
  appId: "1:435762380379:web:2721265e1a3b69327d497e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Load booking from localStorage
const booking = JSON.parse(localStorage.getItem("bookingDetails"));

if (booking) {
  document.getElementById("summary-movie").textContent = booking.movieName;
  document.getElementById("summary-theater").textContent = booking.theater;
  document.getElementById("summary-date").textContent = booking.date;
  document.getElementById("summary-seats").textContent = booking.seats.join(", ");
  document.getElementById("summary-price").textContent = booking.totalprice;
}

// Show/hide payment sections
const upiSection = document.getElementById("upi-section");
const cardSection = document.getElementById("card-section");
const netBankingSection = document.getElementById("netbanking-section");
const walletSection = document.getElementById("wallet-section");

document.querySelectorAll('input[name="payment"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const value = e.target.value;
    upiSection.style.display = value === "UPI" ? "block" : "none";
    cardSection.style.display = value === "Card" ? "block" : "none";
    netBankingSection.style.display = value === "NetBanking" ? "block" : "none";
    walletSection.style.display = value === "Wallet" ? "block" : "none";
  });
});

// Pay Now Button
document.getElementById("pay-btn").addEventListener("click", () => {
  if (!booking || !booking.email) {
    alert("Booking data not found.");
    return;
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef,
          where("userId", "==", user.uid),
          where("status", "==", "pending")
        );

        const snapshot = await getDocs(q);
        const docs = snapshot.docs;

        if (docs.length > 0) {
          const latestBooking = docs[docs.length - 1];
          await updateDoc(doc(db, "bookings", latestBooking.id), {
            status: "paid"
          });

          alert("Payment Successful ✅");
          window.location.href = "success.html";
        } else {
          alert("No pending booking found.");
        }
      } catch (error) {
        console.error("Payment error:", error);
        alert("Payment failed. Try again.");
      }
    } else {
      alert("Please login to continue.");
      window.location.href = "login.html";
    }
  });
});