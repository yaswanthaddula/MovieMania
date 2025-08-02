import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import QRCode from "https://cdn.skypack.dev/qrcode";

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

const movieEl = document.getElementById("movie-name");
const theaterEl = document.getElementById("theater-name");
const dateEl = document.getElementById("show-date");
const seatsEl = document.getElementById("seat-numbers");
const priceEl = document.getElementById("total-price");
const emailEl = document.getElementById("user-email");
const bookingIdEl = document.getElementById("booking-id");
const posterEl = document.getElementById("movie-poster");
const qrCanvas = document.getElementById("qr-code");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Please log in to view your ticket.");
    window.location.href = "login.html";
    return;
  }

  try {
    const selectedId = localStorage.getItem("selectedBookingId");

    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid),
      where("status", "==", "paid")
    );

    const snapshot = await getDocs(q);
    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (bookings.length === 0) {
      document.querySelector(".ticket-box").innerHTML = "<p>No ticket found.</p>";
      return;
    }

    const latest = bookings.find(b => b.id === selectedId) || bookings[bookings.length - 1];

    // Fill data
    movieEl.textContent = latest.movieName;
    theaterEl.textContent = latest.theater;
    dateEl.textContent = latest.date;
    seatsEl.textContent = latest.seats.join(", ");
    priceEl.textContent = latest.totalprice;
    emailEl.textContent = latest.email;
    bookingIdEl.textContent = latest.id;
    posterEl.src = latest.posterUrl || "default.jpg";

    // QR Code
    const ticketData = `
Movie: ${latest.movieName}
Theater: ${latest.theater}
Date: ${latest.date}
Seats: ${latest.seats.join(", ")}
Price: ₹${latest.totalprice}
Email: ${latest.email}
Booking ID: ${latest.id}
    `.trim();

    QRCode.toCanvas(qrCanvas, ticketData, {
      color: { dark: "#000000", light: "#ffffff" }
    });

    // Cancel button
    const cancelBtn = document.getElementById("cancel-btn");
    cancelBtn.addEventListener("click", async () => {
      const confirmDelete = confirm("Are you sure you want to cancel this ticket?");
      if (!confirmDelete) return;

      try {
        await deleteDoc(doc(db, "bookings", latest.id));
        alert("Ticket cancelled successfully.");
        window.location.href = "home.html";
      } catch (err) {
        console.error("Error cancelling ticket:", err);
        alert("Failed to cancel ticket. Please try again.");
      }
    });

  } catch (error) {
    console.error("Error loading ticket:", error);
    document.querySelector(".ticket-box").innerHTML = "<p>Failed to load ticket.</p>";
  }
});

document.getElementById("home-btn").addEventListener("click", () => {
  window.location.href = "home.html";
});