"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title) => electron.ipcRenderer.send("set-title", title)
});
