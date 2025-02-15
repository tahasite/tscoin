const { Telegraf } = require("telegraf");
const fs = require("fs");

const TOKEN = "7490032664:AAHGplFiiDBQkAJMvsLVcFCBI78KYcyRvII"; /* توکن ربات */
const bot = new Telegraf(TOKEN);

const web_link = "https://ts-filmzar.ir/"; /* آدرس وب */
const creator_link = "https://t.me/tahasite_chanel"; /* آدرس کانال یا گروه */
const usersFile = "users.txt";

bot.start((ctx) => {

  const userId = ctx.from.id;
  const username = ctx.from.username || 'Unknown';

ctx.telegram.sendMessage(
  ctx.chat.id,
  `Welcome @${username} to TSCOIN game! ðŸ‘‹\nEarn coins and money easily with just a click.`,
  {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Play Game", web_app: { url: web_link } },
          { text: "Creator", url: creator_link }
        ]
      ]
    }
  }
);

  const userInfo = `${userId} - ${username}\n`;
  fs.appendFile(usersFile, userInfo, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    }
  });
});

bot.launch();

bot.catch((err) => {
  console.error('Telegraf error:', err);
});

console.log('Bot started');
