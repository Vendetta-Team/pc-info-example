const { app, BrowserWindow, Menu, ipcMain, ipcRenderer } = require('electron')
const path = require('path')
const url = require('url')
let win
function createWindow() {
  const paths = path.join
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  })
  win.loadURL(url.format({
    pathname: paths(__dirname, './view/index.html'),
    protocol: 'file:',
    slashes: false
  }))

  win.on('closed', () => {

    app.quit()
    win = null
  })
  // win.webContents.openDevTools() "if you want to debug // with this message"
}
Menu.setApplicationMenu(null);

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.clear()
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})