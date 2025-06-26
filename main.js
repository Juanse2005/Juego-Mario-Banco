const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  const expirationDate = new Date('2025-06-29');
  const now = new Date();

  if (now > expirationDate) {
    dialog.showErrorBox('Juego expirado', 'Este juego ya no está disponible contacta con el desarrollador.');
    app.quit();
    return;
  }

  createWindow();
});
