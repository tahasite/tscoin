/**
 * author : tahasite
 */

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const session = require("express-session");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const dataFilePath = path.join(__dirname, "data", "users.json");

if (!fs.existsSync(path.join(__dirname, "data"))) {
  fs.mkdirSync(path.join(__dirname, "data"));
}

let userData = {};
if (fs.existsSync(dataFilePath)) {
  userData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
}

app.post("/addEmail", (req, res) => {
  const { email } = req.body;

  for (let user in userData) {
    if (userData[user].email === email) {
      return res.json({ success: false, message: "Email already exists!" });
    }
  }

  const username = req.session.user;
  if (username && userData[username]) {
    userData[username].email = email;
    fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));
    return res.json({ success: true, message: "Email added successfully!" });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "User not logged in" });
  }
});

app.get("/getEmail", (req, res) => {
  const username = req.session.user;

  if (username && userData[username]) {
    return res.json({ success: true, email: userData[username].email });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "User not logged in or email not set" });
  }
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password are required." });
  }

  if (userData[username]) {
    return res
      .status(400)
      .json({ success: false, message: "Username already exists" });
  }

  userData[username] = { password, coins: 0, level: 1, credit: 0 };
  fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));

  res.json({ success: true });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password are required." });
  }

  const user = userData[username];
  if (!user || user.password !== password) {
    return res.status(400).json({
      success: false,
      message: "The username or password is incorrect",
    });
  }

  req.session.user = username;
  res.json({ success: true });
});

app.use((req, res, next) => {
  const username = req.session.user;

  if (username && isSessionExpired(username)) {
    req.session.destroy();
    res.redirect("/login.html");
  } else {
    next();
  }
});

app.get("/username", (req, res) => {
  const username = req.session.user;

  if (!username) {
    return res.status(400).json();
  }

  res.json({ success: true, username });
});

app.get("/usernameAccount", (req, res) => {
  const usernameAccount = req.session.user;

  if (!usernameAccount) {
    return res
      .status(400)
      .json({ success: false, message: "User not logged in" });
  }

  res.json({ success: true, usernameAccount: usernameAccount });
});

app.post("/logout", (req, res) => {
  const username = req.session.user;
  if (username) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res
          .status(500)
          .json({
            success: false,
            message: "There is a problem with the exit",
          });
      }
      res.json({ success: true });
    });
  } else {
    res.status(400).json({ success: false, message: "User not logged in" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function isSessionExpired(username) {
  return false;
}

let usersReceivedCoins = {
  subscribeYouTube: [],
  followTelegram: [],
  startTelegramBot: [],
  followInstagram: [],
};

app.post("/addCoins", (req, res) => {
  const username = req.session.user;
  const { coins, action } = req.body;

  if (!username || !userData[username]) {
    return res.status(400).json({ success: false, message: "Invalid user" });
  }

  if (usersReceivedCoins[action].includes(username)) {
    return res
      .status(400)
      .json({
        success: false,
        message: "You have already received coins for this action",
      });
  }

  userData[username].coins += coins;
  fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));

  usersReceivedCoins[action].push(username);

  res.json({
    success: true,
    message: `Thank you for your support! ${coins} coins added to your balance.`,
  });
});

app.post("/transferCoins", (req, res) => {
  const senderUsername = req.session.user;
  const { recipientUsername, amount } = req.body;

  if (!senderUsername || !userData[senderUsername]) {
    return res.status(400).json({ success: false, message: "Invalid sender" });
  }

  if (!recipientUsername || !userData[recipientUsername]) {
    return res
      .status(400)
      .json({ success: false, message: "Recipient not found" });
  }

  const transferAmount = parseInt(amount, 10);
  if (transferAmount <= 0 || isNaN(transferAmount)) {
    return res.status(400).json({ success: false, message: "Invalid amount" });
  }

  if (userData[senderUsername].coins < transferAmount) {
    return res
      .status(400)
      .json({ success: false, message: "Insufficient coins" });
  }

  if (userData[senderUsername].coins < transferAmount) {
    return res
      .status(400)
      .json({ success: false, message: "You don't have enough coins" });
  }

  userData[senderUsername].coins -= transferAmount;
  userData[recipientUsername].coins += transferAmount;

  fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));

  res.json({ success: true, message: "Coins transferred successfully" });
});

app.get("/topPlayers", (req, res) => {
  const topPlayers = Object.entries(userData)
    .sort((a, b) => b[1].coins - a[1].coins)
    .slice(0, 5)
    .map(([username, data]) => ({ username, coins: data.coins }));

  res.json({ success: true, topPlayers });
});

function formatNumber(num) {
  if (num >= 1000000) {
    return new Intl.NumberFormat().format(num);
  } else if (num >= 1000) {
    return new Intl.NumberFormat().format(num);
  } else {
    return new Intl.NumberFormat().format(num);
  }
}

app.post("/increment", (req, res) => {
  const username = req.session.user;

  if (!username || !userData[username]) {
    return res.status(400).json({ success: false, message: "Log in first" });
  }

  const user = userData[username];
  let increment;

  switch (user.level) {
    case 1:
      increment = 1;
      break;
    case 2:
      increment = 3;
      break;
    case 3:
      increment = 5;
      break;
    case 4:
      increment = 6;
      break;
    case 5:
      increment = 7;
      break;
    case 6:
      increment = 8;
      break;
    case 7:
      increment = 9;
      break;
    case 8:
      increment = 10;
      break;
    case 9:
      increment = 11;
      break;
    case 10:
      increment = 12;
      break;
    default:
      increment = 15;
      break;
  }

  if (user.credit < increment) {
    return res
      .status(400)
      .json({ success: false, message: "Not enough credit" });
  }

  user.credit -= increment;

  user.coins += increment;
  fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));

  const formattedCoins = formatNumber(user.coins);

  res.json({ success: true, coins: formattedCoins, increment: increment });
});

app.get("/getCoins", (req, res) => {
  const username = req.session.user;

  if (!username || !userData[username]) {
    return res.status(400).json({ success: false, message: "Invalid user" });
  }

  const user = userData[username];
  const formattedCoins = formatNumber(user.coins);

  res.json({ success: true, coins: formattedCoins });
});

app.post("/levelUp", (req, res) => {
  const username = req.session.user;

  if (!username || !userData[username]) {
    return res.status(400).json();
  }

  const user = userData[username];
  const coinCost = Math.pow(5, user.level - 1) * 200;

  if (user.level >= 10) {
    return res.status(400).json({
      success: false,
      message: "You have reached the maximum level.",
    });
  }

  if (user.coins < coinCost) {
    return res.status(400).json({
      success: false,
      message: `Not enough coins to level up. ${coinCost} coins are required.`,
    });
  }

  user.coins -= coinCost;
  user.level += 1;

  fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));

  res.json({ success: true, coins: user.coins, level: user.level });
});

app.get("/getLevel", (req, res) => {
  const username = req.session.user;

  if (!username || !userData[username]) {
    return res.status(400).json();
  }

  const user = userData[username];

  res.json({ success: true, level: user.level });
});

function calculateMaxCredit(level) {
  let baseCredit = 200;
  let additionalCredit = 0;

  if (level >= 2 && level <= 3) {
    additionalCredit = (level - 1) * 500;
  } else if (level >= 4 && level <= 5) {
    additionalCredit = 500 + (level - 4) * 1500;
  } else if (level >= 6 && level <= 10) {
    additionalCredit = 1000 + (level - 6) * 3000;
  } else if (level > 10) {
    additionalCredit = 2000 + (level - 10) * 10000;
  }

  return baseCredit + additionalCredit;
}

function calculateCreditIncrement(level) {
  if (level <= 3) {
    return 2;
  } else if (level <= 5) {
    return 5;
  } else if (level <= 8) {
    return 8;
  } else if (level <= 10) {
    return 10;
  } else {
    return 10;
  }
}

setInterval(() => {
  for (const user in userData) {
    const maxCredit = calculateMaxCredit(userData[user].level);
    const creditIncrement = calculateCreditIncrement(userData[user].level);

    if (userData[user].credit < maxCredit) {
      userData[user].credit = Math.min(
        userData[user].credit + creditIncrement,
        maxCredit
      );
    }
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));
}, 1000);

app.get("/getCredit", (req, res) => {
  const username = req.session.user;

  if (!username || !userData[username]) {
    return res.status(400).json();
  }

  const user = userData[username];
  const maxCredit = calculateMaxCredit(user.level);

  res.json({ success: true, credit: user.credit, maxCredit: maxCredit });
});

app.get("/claimPrize", (req, res) => {
  const username = req.session.user;

  if (!username || !userData[username]) {
    return res.status(400).json({ success: false, message: "Log in first" });
  }

  const user = userData[username];
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  if (user.lastPrizeTime && now - user.lastPrizeTime < twentyFourHours) {
    const remainingTime = twentyFourHours - (now - user.lastPrizeTime);
    const hours = Math.floor(remainingTime / (60 * 60 * 1000));
    const minutes = Math.floor(
      (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
    );
    return res.status(400).json({
      success: false,
      message: `You can claim the prize again in ${hours} hours and ${minutes} minutes.`,
    });
  }

  const minPrize = 50;
  const maxPrize = 50000;
  const randomPrize =
    Math.floor(Math.random() * (maxPrize - minPrize + 1)) + minPrize;

  user.coins += randomPrize;
  user.lastPrizeTime = now;
  fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));

  const formattedPrize = formatNumber(randomPrize);

  res.json({ success: true, prize: formattedPrize });
});

let codeRewards = {
  "00214587": 100000,
};

const usedCodes = {};

app.post("/redeemCode", (req, res) => {
  const username = req.session.user;
  const code = req.body.code;

  if (!username || !userData[username]) {
    return res.status(400).json();
  }

  if (usedCodes[username] && usedCodes[username].includes(code)) {
    return res
      .status(400)
      .json({ success: false, message: "Code already used" });
  }

  if (codeRewards[code]) {
    const reward = codeRewards[code];
    userData[username].coins += reward;

    if (!usedCodes[username]) {
      usedCodes[username] = [code];
    } else {
      usedCodes[username].push(code);
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));
    const formattedCoins = formatNumber(reward);
    res.json({ success: true, coins: formattedCoins });
  } else {
    res.json({ success: false, message: "Invalid code" });
  }
});

const purchaseOptions = {
  option1: { price: 500000 },
};

app.post("/purchase", (req, res) => {
  const username = req.session.user;
  const option = req.body.option;

  if (!username || !userData[username]) {
    return res.status(400).json({ success: false, message: "Log in first" });
  }

  if (!purchaseOptions[option]) {
    return res.status(400).json({ success: false, message: "Invalid option" });
  }

  const price = purchaseOptions[option].price;

  if (userData[username].coins < price) {
    return res
      .status(400)
      .json({ success: false, message: "Not enough coins" });
  }

  userData[username].coins -= price;
  userData[username].autoClickEnabled = true;
  fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));

  res.json({ success: true, message: "Purchase successful" });
});

app.get("/autoClickStatus", (req, res) => {
  const username = req.session.user;

  if (!username || !userData[username]) {
    return res.status(400).json({ success: false, message: "Log in first" });
  }

  const autoClickEnabled = userData[username].autoClickEnabled || false;

  res.json({ success: true, autoClickEnabled: autoClickEnabled });
});

app.post("/toggleAutoClick", (req, res) => {
  const username = req.session.user;

  if (!username || !userData[username]) {
    return res.status(400).json({ success: false, message: "Log in first" });
  }

  userData[username].autoClickEnabled = !userData[username].autoClickEnabled;
  fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));

  res.json({
    success: true,
    autoClickEnabled: userData[username].autoClickEnabled,
  });
});

const supportDataPath = path.join(__dirname, "supportData.txt");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/submitSupport", (req, res) => {
  const { name, email, message } = req.body;
  const supportEntry = `Name: ${name}, Email: ${email}, Message: ${message}\n`;

  fs.appendFile(supportDataPath, supportEntry, (err) => {
    if (err) {
      console.error("Error writing to file", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to save support request" });
    }

    res.json({
      success: true,
      message: "Support request submitted successfully",
    });
  });
});
