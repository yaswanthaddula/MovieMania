import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { auth } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginMsg = document.getElementById('loginMsg');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;

    if (!email || !password) {
      loginMsg.textContent = "Please enter both email and password.";
      loginMsg.style.color = "red";
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful
        loginMsg.textContent = "Login successful!";
        loginMsg.style.color = "green";
        window.location.href = "home.html"; // redirect on success
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-credential') {
          loginMsg.textContent = "Account not found. Please register first.";
        } else if (errorCode === 'auth/wrong-password') {
          loginMsg.textContent = "Incorrect password.";
        } else if (errorCode === 'auth/invalid-email') {
          loginMsg.textContent = "Invalid email format.";
        } else {
          loginMsg.textContent = "Login failed. " + error.message;
        }

        loginMsg.style.color = "red";
      });
  });
});