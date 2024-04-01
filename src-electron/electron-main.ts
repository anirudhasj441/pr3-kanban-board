import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import DbModel from "./db";
import { Project, Status, Task } from "../types";

console.log("path: ", path.dirname(fileURLToPath(import.meta.url)));
const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

export const BASE_PATH: string = path.join(
    app.getPath("userData"),
    "kanban_board"
);

let mainWindow: BrowserWindow | undefined;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        useContentSize: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, "electron-preload.mjs"),
            devTools: true,
            contextIsolation: true,
            nodeIntegration: true,
        },
    });

    mainWindow.webContents.openDevTools();
    mainWindow.setMenu(null);
    if (process.env.VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile("dist/index.html");
    }
};

app.whenReady().then(() => {
    createWindow();
    const dbModel = new DbModel();
    ipcMain.on("close", () => {
        mainWindow?.close();
    });
    ipcMain.on("minimize", () => {
        mainWindow?.minimize();
    });
    ipcMain.on("maximize", () => {
        console.log("Maximizing: ");
        if (mainWindow?.isMaximized()) {
            mainWindow?.unmaximize();
        } else {
            mainWindow?.maximize();
        }
    });
    ipcMain.on(
        "createProject",
        (evt: Electron.IpcMainEvent, projectTitle: string) => {
            dbModel.createProject(projectTitle);
            console.log("Creating Project ");
            dbModel.setJson();
        }
    );
    ipcMain.on(
        "createTask",
        (
            event: Electron.IpcMainEvent,
            projectId: string,
            taskTitle: string,
            status: Status
        ) => {
            dbModel.createTask(projectId, taskTitle, status);
            console.log("Creating Task!!");
            dbModel.setJson();
        }
    );
    ipcMain.on("getProjects", (event: Electron.IpcMainEvent) => {
        const projects: Project[] = dbModel.getAllProject();
        event.sender.send("getProjects", projects);
    });
    ipcMain.on("getTasks", (event: Electron.IpcMainEvent, projectId) => {
        const tasks = dbModel.getAllTasks(projectId);
        event.sender.send("getTasks", tasks);
    });
    ipcMain.on(
        "deleteTask",
        (event: Electron.IpcMainEvent, projectId: string, taskId: string) => {
            dbModel.deleteTask(projectId, taskId);
            dbModel.setJson();
        }
    );
    ipcMain.on(
        "deleteProject",
        (event: Electron.IpcMainEvent, projectId: string) => {
            dbModel.deleteProject(projectId);
            dbModel.setJson();
        }
    );
    ipcMain.on("projectExists", (event, projectId) => {
        const result = dbModel.projectExists(projectId);
        event.sender.send("projectExists", result);
    });
    ipcMain.on(
        "updateTaskDesc",
        (
            event: Electron.IpcMainEvent,
            projectId: string,
            taskId: string,
            desc: string
        ) => {
            dbModel.updateTaskDesc(projectId, taskId, desc);
            dbModel.setJson();
        }
    );
    ipcMain.on(
        "updateTaskName",
        (
            event: Electron.IpcMainEvent,
            projectId: string,
            taskId: string,
            taskName: string
        ) => {
            dbModel.updateTaskName(projectId, taskId, taskName);
            dbModel.setJson();
        }
    );
    ipcMain.on(
        "updateAllTasks",
        (event: IpcMainEvent, projectId: string, tasks: Task[]) => {
            dbModel.updateAllTasks(projectId, tasks);
            dbModel.setJson();
        }
    );
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
