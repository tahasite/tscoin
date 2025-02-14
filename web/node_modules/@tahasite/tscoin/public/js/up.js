/**
 * author : tahasite
 */

document.addEventListener("DOMContentLoaded", function () {
  const submitCodeButton = document.getElementById("submitCodeButton");
  submitCodeButton.addEventListener("click", () => {
    const code = document.getElementById("codeInput").value;
    fetch("/redeemCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchAndUpdateCoins();
          alert(`You received ${formatNumber(data.coins)} coins!`);
        } else {
          alert("Invalid code. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});

const coinupDiv = document.getElementById("coinup");

function fetchAndUpdateCoinsUp() {
  fetch("/getCoins")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        coinupDiv.textContent = data.coins;
      } else {
        window.location.href = "/login.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      window.location.href = "/login.html";
    });
}

fetchAndUpdateCoinsUp();

setInterval(fetchAndUpdateCoinsUp, 3000);

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".item_flex > div");
  const popups = document.querySelectorAll(".popup");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      popups.forEach((popup) => {
        popup.style.display = "none";
      });
      popups[index].style.display = "block";
    });
  });

  popups.forEach((popup) => {
    const closeButton = popup.querySelector(".close");
    closeButton.addEventListener("click", () => {
      popup.style.display = "none";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleAutoClick = document.getElementById("toggleAutoClick");
  const botStart = document.getElementById("botstart");
  const botStop = document.getElementById("botstop");
  const purchaseButtons = document.querySelectorAll("[id^=buyOption]");
  const coinImage = document.getElementById("coinImage");

  let autoClickEnabled = false;

  function updateAutoClickStatus() {
    fetch("/autoClickStatus")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          autoClickEnabled = data.autoClickEnabled;
          toggleAutoClick.disabled = !autoClickEnabled;
          if (autoClickEnabled) {
            botStart.style.display = "block";
            botStop.style.display = "none";
          } else {
            botStart.style.display = "none";
            botStop.style.display = "block";
          }
        }
      });
  }

  function purchaseOption(option) {
    fetch("/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ option }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          updateAutoClickStatus();
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function autoClick() {
    if (autoClickEnabled) {
      coinImage.click();
    }
  }

  purchaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const option = button.id.replace("buyOption", "");
      purchaseOption("option" + option);
    });
  });

  toggleAutoClick.addEventListener("click", () => {
    if (autoClickEnabled) {
      if (confirm("Are you sure you want to disable auto-click?")) {
        fetch("/toggleAutoClick", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              autoClickEnabled = data.autoClickEnabled;
              alert(
                "Auto-Click is now " +
                  (autoClickEnabled ? "enabled" : "disabled")
              );
              toggleAutoClick.disabled = !autoClickEnabled;
              if (autoClickEnabled) {
                botStart.style.display = "block";
                botStop.style.display = "none";
              } else {
                botStart.style.display = "none";
                botStop.style.display = "block";
              }
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } else {
      fetch("/toggleAutoClick", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            autoClickEnabled = data.autoClickEnabled;
            alert(
              "Auto-Click is now " + (autoClickEnabled ? "enabled" : "disabled")
            );
            toggleAutoClick.disabled = !autoClickEnabled;
            if (autoClickEnabled) {
              botStart.style.display = "block";
              botStop.style.display = "none";
            } else {
              botStart.style.display = "none";
              botStop.style.display = "block";
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });

  setInterval(autoClick, 3000);

  updateAutoClickStatus();
});

document.addEventListener("DOMContentLoaded", () => {
  const transferCoinsBtn = document.getElementById("transferCoinsBtn");
  const recipientUsernameInput = document.getElementById("recipientUsername");
  const amountInput = document.getElementById("amount");

  transferCoinsBtn.addEventListener("click", () => {
    const recipientUsername = recipientUsernameInput.value.trim();
    let amount = parseInt(amountInput.value.trim(), 10);

    if (amount < 100000) {
      alert("Minimum transfer amount is 100k.");
      return;
    }

    fetch("/username")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const currentUsername = data.username;
          if (recipientUsername === currentUsername) {
            alert("You cannot transfer coins to yourself.");
            return;
          }

          fetch("/transferCoins", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ recipientUsername, amount }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                alert("Coins transferred successfully");
              } else {
                alert("Error: " + data.message);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("An error occurred. Please try again later.");
            });
        } else {
          console.error("Failed to fetch current username");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  });
});
