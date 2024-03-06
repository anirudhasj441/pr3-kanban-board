"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  close: () => {
    electron.ipcRenderer.send("close");
  },
  minimize: () => {
    electron.ipcRenderer.send("minimize");
  },
  maximize: () => {
    electron.ipcRenderer.send("maximize");
  }
});
