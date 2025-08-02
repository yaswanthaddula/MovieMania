import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

const bookingList = document.getElementById("booking-list");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Please log in to view history.");
    window.location.href = "login.html";
    return;
  }

  const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
  const snapshot = await getDocs(q);
  const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  if (bookings.length === 0) {
    bookingList.innerHTML = "<p>No bookings found.</p>";
    return;
  }

  bookings.forEach((booking) => {
    const div = document.createElement("div");
    div.className = "booking-card";

    div.innerHTML = `
      <h3>${booking.movieName}</h3>
      <p><strong>Date:</strong> ${booking.date}</p>
      <p><strong>Theater:</strong> ${booking.theater}</p>
      <p><strong>Seats:</strong> ${booking.seats.join(", ")}</p>
      <p><strong>Price:</strong> ₹${booking.totalprice}</p>
      <p><strong>Status:</strong> ${booking.status}</p>
      <button class="view-ticket-btn" data-id="${booking.id}">View Ticket</button>
    `;

    bookingList.appendChild(div);
  });

  // Event delegation for View Ticket buttons
  bookingList.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-ticket-btn")) {
      const id = e.target.getAttribute("data-id");
      localStorage.setItem("selectedBookingId", id);
      window.location.href = "ticket.html";
    }
  });
});

document.getElementById("home-btn").addEventListener("click", () => {
  window.location.href = "home.html";
});