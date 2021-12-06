const { app, BrowserWindow } = require('electron')

// Set env
// =========================================
process.env.NODE_ENV = 'development'
// variable of which env
const isDev = process.env.NODE_ENV !== 'production' ? true : false
// check if mac osx
const isMac = process.platform === 'darwin' ? true : false
// =========================================

let mainWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'ImageShrink',
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev,
  })

  // mainWindow.loadURL(`file://${__dirname}/app/index.html`) // Commented out for use of .loadFile function below
  mainWindow.loadFile(`${__dirname}/app/index.html`)
}

app.on('ready', createMainWindow)

// on mac osx keeps closed application from quitting which is typical of what you expect on OSX
// =========================================
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})
// =========================================
