import { app, BrowserWindow, ipcMain } from "electron";
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
  ipcMain.on("set-title", (event, title) => {
    console.log("title: ", title);
  });
};
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin")
    app.quit();
});
