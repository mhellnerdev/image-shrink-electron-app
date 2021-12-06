const { app, BrowserWindow } = require('electron')

// Set env
process.env.NODE_ENV = 'development'
// variable of which env
const isDev = process.env.NODE_ENV !== 'production' ? true : false
// check if mac osx
const isMac = process.platform === 'darwin' ? true : false

let mainWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'ImageShrink',
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
  })

  // mainWindow.loadURL(`file://${__dirname}/app/index.html`) // Commented out for use of .loadFile function below
  mainWindow.loadFile('./app/index.html')
}

app.on('ready', createMainWindow)
