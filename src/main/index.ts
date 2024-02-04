import { app, shell, BrowserWindow, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { getUrl } from './getUrl';
import { safeIpcMain } from './safeIpcMain';

// boo Scary
let mainWindow: BrowserWindow;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // Because all views are dependent on base window we have to close them
  mainWindow.on('close', (e) => {
    if (BrowserWindow.getAllWindows().length === 1) {
      return;
    }

    const choice = dialog.showMessageBoxSync(mainWindow, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Are you sure you want to quit? You have still some views open.',
    });

    if (choice === 1) {
      e.preventDefault();
      return;
    }

    BrowserWindow.getAllWindows().forEach((window) => {
      if (window.id !== mainWindow.id) {
        window.close();
      }
    });
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}`); // FIXME
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html')); // FIXME
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const windows: Record<string, BrowserWindow> = {};
// due to mainWindow dependency we have to create this function here (or think about better solution to decouple it)
safeIpcMain.on('open-new-window', (_event, pathId, { resolution, name, resizable = false }) => {
  const url = getUrl(pathId);

  if (windows[pathId]) {
    windows[pathId].focus();
  } else {
    const newWin = new BrowserWindow({
      width: resolution.width,
      height: resolution.height,
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        contextIsolation: true,
        sandbox: false,
      },
      resizable,
      title: name,
      autoHideMenuBar: true,
      fullscreenable: resizable,
    });

    windows[pathId] = newWin;
    newWin.loadURL(url);

    newWin.webContents.on('before-input-event', (event, input) => {
      if (input.control && input.key.toLowerCase() === 'e') {
        event.preventDefault();
        newWin.webContents.send('edit-shortcut-pressed');
      }
    });

    newWin.on('closed', () => {
      delete windows[pathId];
      mainWindow.webContents.send('new-window-closed', pathId);
    });
  }
});
