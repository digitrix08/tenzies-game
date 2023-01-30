// ./public/electron.js
const path = require("path");
require("dotenv").config();

const { app, BrowserWindow } = require("electron");
const isDev = process.env.ENVIRONMENT === "development" ? true : false;

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        icon: path.join(__dirname, "../src/assets/images/red-die.png"),
        contextIsolation: true,
        webPreferences: {
            disableBlinkFeatures: "Auxclick",
            sandbox: true,
        },
    });

    // security

    win.webContents.on("will-navigate", function (event) {
        event.preventDefault();
    });

    win.webContents.setWindowOpenHandler(function () {
        return { action: "deny" };
    });

    win.webContents.session.setPermissionRequestHandler(function (
        webContents,
        permission,
        callback
    ) {
        return callback(false);
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");

    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: "detach" });
        require("electron-reload")(__dirname, {
            // Note that the path to electron may vary according to the main file
            electron: require(`${__dirname}/../node_modules/electron`),
            forceHardReset: true,
        });
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
