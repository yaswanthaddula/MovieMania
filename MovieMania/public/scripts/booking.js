import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase Config
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

let ticketPrice = 0;
const selectedSeats = new Set();

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// Load Movie
async function loadMovieDetails() {
  const movieRef = doc(db, "movies", movieId);
  const docSnap = await getDoc(movieRef);

  if (docSnap.exists()) {
    const movie = docSnap.data();
    document.getElementById("movie-poster").src = movie.poster;
    document.getElementById("movie-name").textContent = movie.name;
    document.getElementById("movie-desc").textContent = movie.description;
    document.getElementById("movie-lang").textContent = "Language: " + movie.language;
    document.getElementById("ticket-price").textContent = movie.price;
    ticketPrice = movie.price;

    renderSeats();
  } else {
    alert("Movie not found");
  }
}

// Generate seat buttons
function renderSeats() {
  const container = document.getElementById("seats-container");
  const rows = ['A', 'B', 'C', 'D', 'E'];
  container.innerHTML = "";

  rows.forEach(row => {
    for (let i = 1; i <= 10; i++) {
      const seatId = `${row}${i}`;
      const btn = document.createElement("button");
      btn.textContent = seatId;

      // Example of disabled seat
      if (seatId === 'C5' || seatId === 'D7') {
        btn.classList.add("disabled");
        btn.disabled = true;
      } else {
        btn.addEventListener("click", () => toggleSeat(seatId, btn));
      }

      container.appendChild(btn);
    }
  });
}

function toggleSeat(seatId, button) {
  if (selectedSeats.has(seatId)) {
    selectedSeats.delete(seatId);
    button.classList.remove("selected");
  } else {
    selectedSeats.add(seatId);
    button.classList.add("selected");
  }

  document.getElementById("total-price").textContent = selectedSeats.size * ticketPrice;
}

// Handle Proceed
document.getElementById("proceed-btn").addEventListener("click", () => {
  const date = document.getElementById("show-date").value;
  const theater = document.getElementById("theater-select").value;

  if (!date || !theater || selectedSeats.size === 0) {
    alert("Please select date, theater, and seats");
    return;
  }

  const movieName = document.getElementById("movie-name").textContent;
  const posterUrl = document.getElementById("movie-poster").src;
  const totalPrice = selectedSeats.size * ticketPrice;

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      alert("Please login to continue.");
      window.location.href = "login.html";
      return;
    }

    try {
      const booking = {
        userId: user.uid,
        email: user.email,
        movieName,
        posterUrl,
        date,
        theater,
        seats: Array.from(selectedSeats),
        totalprice: totalPrice,
        status: "pending"
      };

      await addDoc(collection(db, "bookings"), booking);
      localStorage.setItem("bookingDetails", JSON.stringify(booking));
      window.location.href = "payment.html";
    } catch (err) {
      alert("Error booking: " + err.message);
    }
  });
});

loadMovieDetails();