// public/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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

// ✅ Export app too
export { app, auth, db };