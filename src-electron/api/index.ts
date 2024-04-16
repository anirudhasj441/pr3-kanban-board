/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcRenderer } from "electron";
import { Status, Task } from "../../types";

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
    getProjects: (): void => {
        ipcRenderer.send("getProjects");
    },
    getTasks: (projectId: string): void => {
        ipcRenderer.send("getTasks", projectId);
    },
    createProject: (projectTitle: string): void => {
        ipcRenderer.send("createProject", projectTitle);
    },
    createTask: (
        projectId: string,
        taskTitle: string,
        status: Status
    ): void => {
        ipcRenderer.send("createTask", projectId, taskTitle, status);
    },
    deleteTask: (projectId: string, taskId: string): void => {
        ipcRenderer.send("deleteTask", projectId, taskId);
    },
    deleteProject: (projectId: string): void => {
        ipcRenderer.send("deleteProject", projectId);
    },
    projectExists: (projectId: string): void => {
        ipcRenderer.send("projectExists", projectId);
    },
    updateTaskDesc: (projectId: string, taskId: string, desc: string): void => {
        ipcRenderer.send("updateTaskDesc", projectId, taskId, desc);
    },
    updateTaskName: (
        projectId: string,
        taskId: string,
        taskName: string
    ): void => {
        ipcRenderer.send("updateTaskName", projectId, taskId, taskName);
    },
    updateTaskProgress: (
        projectId: string,
        taskId: string,
        progress: number
    ): void => {
        ipcRenderer.send("updateTaskProgress", projectId, taskId, progress);
    },
    updateAllTasks: (projectId: string, tasks: Task[]): void => {
        ipcRenderer.send("updateAllTasks", projectId, tasks);
    },
    receive: (channel: string, func: (...args: any) => void) => {
        ipcRenderer.on(
            channel,
            (_event: Electron.IpcRendererEvent, ...args: any): void =>
                func(...args)
        );
    },
};

export default electronAPI;
