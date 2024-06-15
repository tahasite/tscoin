<img style="width: 300px;" src="https://s8.uupload.ir/files/tscoin-cover_(3)_(1)_3kpn.png" alt="tscoin_img">

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
     npm start
     npm install express-session
     npm install express body-parser fs
     ```

6. **Restart Your Node.js Server:**
   - Go back to the Node.js application section in Cpanel and restart the server.

Once these steps are completed, your Node.js script should be running correctly when you access your project's URL.

By following this guide, you should be able to set up and run your Node.js application on Cpanel without any issues.
