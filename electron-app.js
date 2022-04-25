const {app, BrowserWindow} = require('electron')
const path = require("path");
const electron = require("electron");

function isDev() {
    if (typeof electron === 'string') {
        throw new TypeError('Not running in an Electron environment!');
    }

    const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
    const getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;

   return isEnvSet ? getFromEnv : !electron.app.isPackaged;
}

function getUrl() {
    return isDev()
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, 'build/index.html')}`;
}

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadURL(getUrl())
        .catch(() => console.log("Can't open Electron window"));

    mainWindow.webContents.on('will-redirect',
        (event, url) => returnToApp(new URL(url), mainWindow));
}

function returnToApp(url, window) {
    const urlParams = new URLSearchParams(url.search);
    const appUrl = getUrl().concat(
        "?code=", urlParams.get("code"),
        "&state=", urlParams.get("state"),
        "&session_state=", urlParams.get("session_state"));

    window.loadURL(appUrl)
        .catch(() => console.log("Can't return to app"));
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    app.quit()
})