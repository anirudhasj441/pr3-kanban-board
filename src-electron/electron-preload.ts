import { contextBridge, ipcRenderer } from "electron";

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
    getProjects: (): void => {
        ipcRenderer.send("getProjects");
    },
    receive: (channel: string, func: (...args: unknown[]) => void) => {
        ipcRenderer.on(
            channel,
            (event: Electron.IpcRendererEvent, ...args: unknown[]) =>
                func(...args)
        );
    },
});
