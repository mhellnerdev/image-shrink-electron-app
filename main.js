const { app, BrowserWindow, Menu, globalShortcut } = require('electron')

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

  mainWindow.loadFile(`${__dirname}/app/index.html`)
}

app.on('ready', () => {
  createMainWindow()

  // setup menus from menu array
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)

  globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
  globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () =>
    mainWindow.toggleDevTools()
  )

  mainWindow.on('closed', () => (mainWindow = null))
})

// setup top dianlog menu arrays
const menu = [
  // make sure all basic mac osx menu items are included in the "file" menu
  // note: roles are predefined menu sets
  ...(isMac ? [{ role: 'appMenu' }] : []),
  // build menu
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        // accelerator: isMac ? 'Command + W' : 'Ctrl+W',
        accelerator: 'CmdOrCtrl+W',

        click: () => app.quit(),
      },
    ],
  },
]

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
