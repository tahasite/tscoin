/**
 * author : tahasite
 */

const coinImage = document.getElementById("coinImage");
const coinCountDiv = document.getElementById("coinCount");
const usernameDiv = document.getElementById("username");
const logoutButton = document.getElementById("logoutButton");
const levelUpButton = document.getElementById("levelUpButton");
const levelDiv = document.getElementById("level");
const claimPrizeButton = document.getElementById("claimPrizeButton");

claimPrizeButton.addEventListener("click", () => {
  fetch("/claimPrize")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        fetchAndUpdateCoins();
        alert(`Congratulations! You won ${data.prize} coins!`);
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

let coinIncrement = 1;

let currentCredit = 0;
const creditDiv = document.getElementById("credit");
const progressDiv = document.getElementById("progressBarFill");
let maxCredit = 200;

setInterval(() => {
  if (currentCredit < maxCredit) {
    currentCredit += 2;
    creditDiv.textContent = `Credit: ${currentCredit}`;
  }
}, 2000);

function formatNumber(number) {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + "k";
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "m";
  } else {
    return number.toString();
  }
}

function updateLevelUpButton() {
  fetch("/getLevel")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        let coinCost;
        if (data.level < 10) {
          coinCost = formatNumber(Math.pow(5, data.level - 1) * 200);
        } else {
          coinCost = "MAX";
        }
        levelUpButton.textContent = `Level Up (${coinCost} coins)`;
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

updateLevelUpButton();

setInterval(updateLevelUpButton, 5000);

setInterval(() => {
  fetch("/getCredit")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        currentCredit = data.credit;
        maxCredit = data.maxCredit;
        creditDiv.textContent = `Credit: ${currentCredit}`;
        const percentage = (currentCredit / maxCredit) * 100;
        progressDiv.style.width = `${percentage}%`;
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}, 1000);

fetch("/username")
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      usernameDiv.textContent = `username: ${data.username}`;
    } else {
      window.location.href = "/login.html";
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    window.location.href = "/login.html";
  });

fetch("/getLevel")
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      const levelText = data.level >= 10 ? "MAX" : data.level;
      levelDiv.textContent = `Level: ${levelText}`;

      if (data.level >= 10) {
        coinImage.style.boxShadow = "5px 9px 100px rgba(255, 0, 0, 1)";
      }
    } else {
      alert("Error: " + data.message);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

coinImage.addEventListener("click", () => {
  fetch("/increment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        coinCountDiv.textContent = `${data.coins}`;
        showCoinAnimation(data.increment);
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

logoutButton.addEventListener("click", () => {
  fetch("/logout", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        window.location.href = "/login.html";
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function showCoinAnimation(amount) {
  const animation = document.createElement("div");
  animation.classList.add("coin-animation");
  animation.textContent = `+${amount}`;
  document.body.appendChild(animation);

  const rect = coinImage.getBoundingClientRect();
  animation.style.left = `${rect.left + rect.width / 2}px`;
  animation.style.top = `${rect.top}px`;

  animation.addEventListener("animationend", () => {
    animation.remove();
  });
}

fetch("/getCoins")
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      coinCountDiv.textContent = `${data.coins}`;
    } else {
      window.location.href = "/login.html";
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    window.location.href = "/login.html";
  });

levelUpButton.addEventListener("click", () => {
  const confirmation = confirm("Are you sure you want to level up?");
  if (confirmation) {
    fetch("/levelUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          coinIncrement = data.level;
          coinCountDiv.textContent = `${data.coins}`;
          levelDiv.textContent = `Level: ${data.level}`;
          alert(
            "Level Up Successful! You now earn " +
              data.level +
              " coins per click."
          );
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".menu_main button");
  const contents = document.querySelectorAll(".content");

  function showContent(id) {
    contents.forEach((content) => {
      content.classList.remove("active");
    });
    document.getElementById(id + "_content").classList.add("active");

    localStorage.setItem("selectedButton", id);

    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
  }

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      showContent(this.id);
    });
  });

  const selectedButton = localStorage.getItem("selectedButton");
  if (selectedButton) {
    showContent(selectedButton);
  } else {
    showContent("box_main");
  }
});

function fetchAndUpdateCoins() {
  fetch("/getCoins")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        coinCountDiv.textContent = `${data.coins}`;
      } else {
        window.location.href = "/login.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      window.location.href = "/login.html";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const topPlayersList = document.getElementById("topPlayersList");

  fetch("/topPlayers")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        data.topPlayers.forEach((player) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${player.username}: ${player.coins}`;
          topPlayersList.appendChild(listItem);
        });
      } else {
        console.error("Failed to fetch top players");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

document.getElementById("subscribeYouTube").addEventListener("click", () => {
  window.open("https://www.youtube.com/channel/your_channel_id", "_blank");
  addCoins(100000, "subscribeYouTube");
});

document.getElementById("followTelegram").addEventListener("click", () => {
  window.open("https://t.me/your_channel", "_blank");
  addCoins(100000, "followTelegram");
});

document.getElementById("startTelegramBot").addEventListener("click", () => {
  addCoins(100000, "startTelegramBot");
});

document.getElementById("followInstagram").addEventListener("click", () => {
  window.open("https://www.instagram.com/your_page", "_blank");

  addCoins(100000, "followInstagram");
});

function addCoins(coins, action) {
  fetch("/addCoins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coins: coins,
      action: action,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert(data.message);
      } else {
        alert("Failed to add coins: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
