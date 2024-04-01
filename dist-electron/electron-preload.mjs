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
  updateTaskDesc: (projectId, taskId, desc) => {
    electron.ipcRenderer.send("updateTaskDesc", projectId, taskId, desc);
  },
  updateTaskName: (projectId, taskId, taskName) => {
    electron.ipcRenderer.send("updateTaskName", projectId, taskId, taskName);
  },
  updateAllTasks: (projectId, tasks) => {
    electron.ipcRenderer.send("updateAllTasks", projectId, tasks);
  },
  receive: (channel, func) => {
    electron.ipcRenderer.on(
      channel,
      (event, ...args) => func(...args)
    );
  }
});
