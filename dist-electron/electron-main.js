import { app, ipcMain, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
console.log("path: ", path.dirname(fileURLToPath(import.meta.url)));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1e3,
    height: 600,
    useContentSize: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "electron-preload.mjs"),
      devTools: true,
      nodeIntegration: true
    }
  });
  mainWindow.webContents.openDevTools();
  mainWindow.setMenu(null);
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile("dist/index.html");
  }
};
app.whenReady().then(() => {
  createWindow();
  ipcMain.on("close", () => {
    mainWindow == null ? void 0 : mainWindow.close();
  });
  ipcMain.on("minimize", () => {
    mainWindow == null ? void 0 : mainWindow.minimize();
  });
  ipcMain.on("maximize", () => {
    console.log("Maximizing: ");
    if (mainWindow == null ? void 0 : mainWindow.isMaximized()) {
      mainWindow == null ? void 0 : mainWindow.unmaximize();
    } else {
      mainWindow == null ? void 0 : mainWindow.maximize();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin")
    app.quit();
});
