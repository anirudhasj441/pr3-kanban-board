import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    close: () => {
        ipcRenderer.send("close");
    },
    minimize: () => {
        ipcRenderer.send("minimize");
    },
    maximize: () => {
        ipcRenderer.send("maximize");
    },
});
