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
  },
  createProject: (projectTitle) => {
    electron.ipcRenderer.send("createProject", projectTitle);
  },
  getProjects: () => {
    electron.ipcRenderer.send("getProjects");
  },
  receive: (channel, func) => {
    electron.ipcRenderer.on(
      channel,
      (event, ...args) => func(...args)
    );
  }
});
