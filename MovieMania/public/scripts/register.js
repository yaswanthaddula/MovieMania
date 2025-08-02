import { app } from './firebase-config.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const auth = getAuth(app);

const registerForm = document.getElementById("registerForm");
const msg = document.getElementById("msg");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        msg.textContent = "Registration successful! Please login.";
        msg.style.color = "green";
      })
      .catch((error) => {
        msg.textContent = error.message;
        msg.style.color = "red";
      });
  });
}