/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcRenderer } from "electron";
import { Status, Task } from "../types";

const electronAPI = {
    close: (): void => {
        ipcRenderer.send("close");
    },
    minimize: (): void => {
        ipcRenderer.send("minimize");
    },
    maximize: (): void => {
        ipcRenderer.send("maximize");
    },
    createProject: (projectTitle: string): void => {
        ipcRenderer.send("createProject", projectTitle);
    },
    createTask: (projectId: string, taskTitle: string, status: Status) => {
        ipcRenderer.send("createTask", projectId, taskTitle, status);
    },
    getProjects: (): void => {
        ipcRenderer.send("getProjects");
    },
    getTasks: (projectId: string): void => {
        ipcRenderer.send("getTasks", projectId);
    },
    deleteTask: (projectId: string, taskId: string) => {
        ipcRenderer.send("deleteTask", projectId, taskId);
    },
    deleteProject: (projectId: string) => {
        ipcRenderer.send("deleteProject", projectId);
    },
    projectExists: (projectId: string) => {
        ipcRenderer.send("projectExists", projectId);
    },
    updateTaskDesc: (projectId: string, taskId: string, desc: string) => {
        ipcRenderer.send("updateTaskDesc", projectId, taskId, desc);
    },
    updateTaskName: (projectId: string, taskId: string, taskName: string) => {
        ipcRenderer.send("updateTaskName", projectId, taskId, taskName);
    },
    updateAllTasks: (projectId: string, tasks: Task[]) => {
        ipcRenderer.send("updateAllTasks", projectId, tasks);
    },
    receive: (channel: string, func: (...args: any) => void) => {
        ipcRenderer.on(
            channel,
            (_event: Electron.IpcRendererEvent, ...args: any) => func(...args)
        );
    },
};

export default electronAPI;
