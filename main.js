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
let aboutWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'ImageShrink',
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev,
    backgroundColor: 'gray',
  })

  mainWindow.loadFile(`${__dirname}/app/index.html`)
}

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: 'About ImageShrink',
    width: 300,
    height: 300,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: false,
    backgroundColor: 'white',
  })

  aboutWindow.loadFile(`${__dirname}/app/about.html`)
}

app.on('ready', () => {
  createMainWindow()

  // setup menus from menu array
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)

  // global shortcuts below can be commented out due to the roles being brought into the menu object
  // globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
  // globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () =>
  //   mainWindow.toggleDevTools()
  // )

  mainWindow.on('closed', () => (mainWindow = null))
})

// setup top dianlog menu arrays
const menu = [
  // make sure all basic mac osx menu items are included in the "file" menu
  // note: roles are predefined menu sets
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  // build menu
  {
    role: 'fileMenu',
  },
  ...(!isMac
    ? [
        {
          label: 'Help',
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  ...(isDev
    ? [
        {
          label: 'Developer',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'toggledevtools' },
          ],
        },
      ]
    : []),
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
