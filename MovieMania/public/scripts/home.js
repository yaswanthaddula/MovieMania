import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
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
const db = getFirestore(app);
const auth = getAuth(app);

// Sidebar user info
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("userName").textContent = user.displayName || "User";
    document.getElementById("popupName").textContent = user.displayName || "-";
    document.getElementById("popupEmail").textContent = user.email;
  } else {
    window.location.href = "login.html";
  }
});

// Logout
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

// Load movies
async function loadMovies() {
  const movieList = document.getElementById("moviesList");
  const comingSoonList = document.getElementById("comingSoonList");

  movieList.innerHTML = "";
  comingSoonList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "movies"));

  snapshot.forEach((doc) => {
    const movie = doc.data();
    const rating = movie.rating || 0;

    const card = document.createElement("div");
    card.className = "movie-card";

    // Proper content structure
    card.innerHTML = `
      <img src="${movie.poster}" alt="Poster" class="movie-poster" />
      <h3 class="movie-title">${movie.name}</h3>
      <p class="movie-lang">${movie.language}</p>
      <p class="movie-rating">⭐ ${rating} / 5</p>
      <button onclick="location.href='booking.html?id=${doc.id}'">Book Now</button>
    `;

    if (movie.status === "now_showing") {
      movieList.appendChild(card);
    } else {
      comingSoonList.appendChild(card);
    }
  });
}

// Account Popup
const accountBtn = document.getElementById("accountBtn");
const accountPopup = document.getElementById("accountPopup");
const closePopup = document.querySelector(".close");

accountBtn.onclick = () => accountPopup.style.display = "flex";
closePopup.onclick = () => accountPopup.style.display = "none";
window.onclick = (e) => {
  if (e.target === accountPopup) {
    accountPopup.style.display = "none";
  }
};

loadMovies();