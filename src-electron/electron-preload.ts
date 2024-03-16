import { contextBridge, ipcRenderer } from "electron";
import { Status } from "../types";

contextBridge.exposeInMainWorld("electronAPI", {
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
    receive: (channel: string, func: (...args: unknown[]) => void) => {
        ipcRenderer.on(
            channel,
            (event: Electron.IpcRendererEvent, ...args: unknown[]) =>
                func(...args)
        );
    },
});
