<img style="width: 300px;" src="https://s8.uupload.ir/files/tscoin-cover_(3)_(1)_3kpn.png" alt="tscoin_img">

[![Instagram](https://s8.uupload.ir/files/3721672-instagram_108066_ysju.png)](https://www.instagram.com/tahasite)
[![chanel Telegram](https://s8.uupload.ir/files/telegram_macos_bigsur_icon_189662_0fj4.png)](https://t.me/tahasite_chanel)

<br>

[![DEMO](https://s8.uupload.ir/files/demo_git_y3xw.png)](https://t.me/tscoinsbot)
[![DEMO](https://s8.uupload.ir/files/دمو_git_nxhe.png)](https://t.me/tscoinsbot)

# tscoin EA
Similar to NotCoin script Tscoin

### Installation Guide for Web from Cpanel

This script consists of two folders:
- Web
- Bot

### Web Installation Instructions from Cpanel

You will need a hosting service that supports creating a Node.js project. Follow these steps to set up your application:

1. **Set Up Node.js Application:**
   - Choose the `Setup Node.js App` option.
   - Click on `Create application`.

2. **Configure Application:**
   - On the `CREATE APPLICATION` page:
     - Set the `Node.js version` to the latest version. We recommend version 20.12.2.
     - `Application root`: Enter the name of your project folder.
     - `Application URL`: Enter the URL of your project.
     - `Application startup file`: Set this to `server.js`.
   - Finally, click `Create`.

3. **Upload Project Files:**
   - Go to `File Manager`.
   - Navigate to the folder you specified as the `Application root`.
   - Upload the `zip` file from the `web` folder into this directory and extract it by right-clicking and selecting `Extract`.

4. **Activate Node.js Environment and Install Dependencies:**
   - Open `Terminal` in Cpanel.
   - Enter the command to activate your Node.js environment, for example:
     ```sh
     source /home/tsfilmza/nodevenv/tscoinbot/16/bin/activate && cd /home/tsfilmza/tscoinbot
     ```

5. **Install Required Packages:**
   - After navigating to your project folder, run the following commands:
     ```sh
     npm install
     npm start
     ```

6. **Restart Your Node.js Server:**
   - Go back to the Node.js application section in Cpanel and restart the server.

Once these steps are completed, your Node.js script should be running correctly when you access your project's URL.

By following this guide, you should be able to set up and run your Node.js application on Cpanel without any issues.

### Setting Up and Launching the Bot

Now it’s time to set up and launch your bot.

### Bot Installation Instructions from Cpanel

You will need a hosting service that supports creating a Node.js project. Follow these steps to set up your bot:

1. **Set Up Node.js Application:**
   - Choose the `Setup Node.js App` option.
   - Click on `Create application`.

2. **Configure Application:**
   - On the `CREATE APPLICATION` page:
     - Set the `Node.js version` to the latest version. We recommend version 20.12.2.
     - `Application root`: Enter the name of your project folder.
     - `Application URL`: Enter the URL of your project.
     - `Application startup file`: Set this to `bot.js`.
   - Finally, click `Create`.

3. **Upload Project Files:**
   - Go to `File Manager`.
   - Navigate to the folder you specified as the `Application root`.
   - Upload the `zip` file from the `bot` folder into this directory and extract it.
   - Right-click on the `bot.js` file, click `Edit`, and replace the bot token with your actual bot token. Also, update the web URL with the one you created.
   - Save your changes.

4. **Activate Node.js Environment and Install Dependencies:**
   - Open `Terminal` in Cpanel.
   - Enter the command to activate your Node.js environment, for example:
     ```sh
     source /home/tsfilmza/nodevenv/tscoinbot/16/bin/activate && cd /home/tsfilmza/tscoinbot
     ```

5. **Install Required Packages:**
   - After navigating to your project folder, run the following commands:
     ```sh
     npm start
     npm install telegraf
     npm install -g forever
     ```

6. **Start the Bot with Forever:**
   - Run the following command to start your bot permanently:
     ```sh
     forever start bot.js
     ```

After running `forever start bot.js`, your bot should be running continuously. When users click the `Play Game` button in the bot, it should open the web address you configured.

By following these instructions, you should be able to set up and run your Node.js bot on Cpanel without any issues.

# tscoin FA
مشابه اسکریپت NotCoin Tscoin


### آموزش نصب Web از Cpanel

این اسکریپت دو پوشه دارد:
- Web
- Bot

### دستورالعمل نصب Web از Cpanel

برای این کار به یک هاست نیاز دارید که قابلیت ایجاد پروژه Node.js را داشته باشد. مراحل زیر را دنبال کنید:

1. **ایجاد برنامه Node.js:**
   - گزینه `Setup Node.js App` را انتخاب کنید.
   - روی `Create application` کلیک کنید.

2. **پیکربندی برنامه:**
   - در صفحه `CREATE APPLICATION`:
     - نسخه `Node.js` را روی جدیدترین نسخه تنظیم کنید. پیشنهاد ما نسخه 20.12.2 است.
     - `Application root`: نام پوشه پروژه را وارد کنید.
     - `Application URL`: آدرس پروژه را وارد کنید.
     - `Application startup file`: این مورد را به `server.js` تنظیم کنید.
   - در نهایت روی `Create` کلیک کنید.

3. **آپلود فایل‌های پروژه:**
   - به `File Manager` بروید.
   - به پوشه‌ای که به عنوان `Application root` مشخص کرده‌اید، بروید.
   - فایل `zip` داخل پوشه `web` را در این پوشه آپلود کنید و با راست کلیک کردن آن را اکسترکت کنید.

4. **فعال‌سازی محیط Node.js و نصب وابستگی‌ها:**
   - به `Terminal` در Cpanel بروید.
   - دستور زیر را برای فعال‌سازی محیط Node.js خود وارد کنید، به عنوان مثال:
     ```sh
     source /home/tsfilmza/nodevenv/tscoinbot/16/bin/activate && cd /home/tsfilmza/tscoinbot
     ```

5. **نصب بسته‌های مورد نیاز:**
   - بعد از وارد شدن به پوشه پروژه خود، دستورات زیر را اجرا کنید:
     ```sh
     npm start
     npm install express-session
     npm install express body-parser fs
     ```

6. **ری‌استارت کردن سرور Node.js:**
   - به بخش برنامه‌های Node.js در Cpanel برگردید و سرور را ری‌استارت کنید.

پس از انجام این مراحل، اسکریپت Node.js شما باید به درستی با وارد کردن آدرس پروژه در مرورگر، کار کند.

با دنبال کردن این راهنما، شما باید بتوانید برنامه Node.js خود را به درستی در Cpanel تنظیم و اجرا کنید.

### راه‌اندازی و ساخت ربات

حالا نوبت به راه‌اندازی و ساخت ربات می‌رسد.

### آموزش نصب ربات از طریق Cpanel

شما نیاز به یک هاست دارید که قابلیت ایجاد پروژه Node.js را دارد. مراحل زیر را برای راه‌اندازی ربات دنبال کنید:

1. **تنظیمات برنامه Node.js:**
   - گزینه `Setup Node.js App` را انتخاب کنید.
   - روی `Create application` کلیک کنید.

2. **پیکربندی برنامه:**
   - در صفحه `CREATE APPLICATION`:
     - نسخه `Node.js version` را به جدیدترین نسخه تنظیم کنید. پیشنهاد ما نسخه 20.12.2 است.
     - `Application root`: نام پوشه پروژه را وارد کنید.
     - `Application URL`: آدرس پروژه را وارد کنید.
     - `Application startup file`: این گزینه را به `bot.js` تنظیم کنید.
   - در نهایت، روی `Create` کلیک کنید.

3. **آپلود فایل‌های پروژه:**
   - به `File Manager` بروید.
   - به پوشه‌ای که به عنوان `Application root` تعیین کرده‌اید، وارد شوید.
   - فایل `zip` موجود در پوشه `bot` را در این دایرکتوری آپلود کرده و استخراج کنید.
   - روی فایل `bot.js` راست کلیک کنید، `Edit` را انتخاب کنید و توکن ربات را با توکن واقعی خود جایگزین کنید. همچنین، آدرس وب را با آدرس وبی که ساخته‌اید، به‌روز کنید.
   - تغییرات را ذخیره کنید.

4. **فعال‌سازی محیط Node.js و نصب وابستگی‌ها:**
   - به `Terminal` در Cpanel بروید.
   - فرمان زیر را برای فعال‌سازی محیط Node.js وارد کنید:
     ```sh
     source /home/tsfilmza/nodevenv/tscoinbot/16/bin/activate && cd /home/tsfilmza/tscoinbot
     ```

5. **نصب بسته‌های مورد نیاز:**
   - بعد از ورود به پوشه پروژه، دستورات زیر را اجرا کنید:
     ```sh
     npm start
     npm install telegraf
     npm install -g forever
     ```

6. **راه‌اندازی دائمی ربات با Forever:**
   - فرمان زیر را برای راه‌اندازی دائمی ربات اجرا کنید:
     ```sh
     forever start bot.js
     ```

پس از اجرای `forever start bot.js`، ربات شما باید به صورت دائمی اجرا شود. هنگامی که کاربران روی دکمه `Play Game` در ربات کلیک کنند، باید آدرس وبی که پیکربندی کرده‌اید، باز شود.

با دنبال کردن این دستورالعمل‌ها، شما باید بتوانید ربات Node.js خود را بدون هیچ مشکلی در Cpanel راه‌اندازی و اجرا کنید.
