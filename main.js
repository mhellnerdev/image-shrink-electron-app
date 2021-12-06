const { app, BrowserWindow } = require('electron')

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
