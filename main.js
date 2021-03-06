const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const ipc = electron.ipcMain;
const Menu = electron.Menu;
const Tray = electron.Tray;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let GamesWindow;


function createTrayIcon() {

  let appIcon = null;

  const iconName = process.platform === 'win32' ? 'robot-512.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, iconName);
  appIcon = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([{
    label: 'Show Games',
    click: function () {
      showGames();
    }
  }]);
  appIcon.setToolTip('Tiny Multiplayer Robot');
  appIcon.setContextMenu(contextMenu);


  app.on('window-all-closed', function () {
    if (appIcon) appIcon.destroy();
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createTrayIcon);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (GamesWindow === null) {
    showGames();
  }
});


function showGames() {
  if (GamesWindow) return;

  GamesWindow = new BrowserWindow({
    width: 600,
    height: 300,
    show: true
  });

  GamesWindow.setMenu(null);

  // Emitted when the window is closed.
  GamesWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    GamesWindow = null
  });
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
