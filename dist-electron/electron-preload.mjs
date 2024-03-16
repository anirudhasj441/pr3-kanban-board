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
  createTask: (projectId, taskTitle, status) => {
    electron.ipcRenderer.send("createTask", projectId, taskTitle, status);
  },
  getProjects: () => {
    electron.ipcRenderer.send("getProjects");
  },
  getTasks: (projectId) => {
    electron.ipcRenderer.send("getTasks", projectId);
  },
  deleteTask: (projectId, taskId) => {
    electron.ipcRenderer.send("deleteTask", projectId, taskId);
  },
  deleteProject: (projectId) => {
    electron.ipcRenderer.send("deleteProject", projectId);
  },
  projectExists: (projectId) => {
    electron.ipcRenderer.send("projectExists", projectId);
  },
  receive: (channel, func) => {
    electron.ipcRenderer.on(
      channel,
      (event, ...args) => func(...args)
    );
  }
});
