document.addEventListener("DOMContentLoaded", () => {
  const booking = JSON.parse(localStorage.getItem("bookingDetails"));

  const movieEl = document.getElementById("movie-name");
  const theaterEl = document.getElementById("theater-name");
  const dateEl = document.getElementById("show-date");
  const seatsEl = document.getElementById("seat-numbers");
  const priceEl = document.getElementById("total-price");
  const summaryBox = document.querySelector(".summary-box");
  const header = document.querySelector(".success-header");

  if (booking) {
    movieEl.textContent = booking.movieName || "N/A";
    theaterEl.textContent = booking.theater || "N/A";
    dateEl.textContent = booking.date || "N/A";
    seatsEl.textContent = booking.seats?.join(", ") || "N/A";
    priceEl.textContent = booking.totalprice || "0";

    // Remove after displaying once
    localStorage.removeItem("bookingDetails");
  } else {
    if (header) header.style.display = "none";

    summaryBox.innerHTML = `
      <p style="color: red;">❌ No booking details found.</p>
      <small style="color: gray;">(Please avoid refreshing this page. Data is only shown once.)</small>
    `;
  }

  document.getElementById("home-btn").addEventListener("click", () => {
    window.location.href = "home.html";
  });
});