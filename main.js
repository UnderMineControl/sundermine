const {app, BrowserWindow, ipcMain} = require('electron')
const url = require("url");
const path = require("path");
const debug = true;

let mainWindow

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 1450,
        height: 900,
        frame: false,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            devTools: debug
        },
        icon: path.join(__dirname, `/dist/assets/icon.ico`)
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') 
        app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) 
        createWindow()
})
