import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import DbModel from "./db";
import { Project, Status, Task } from "../types";

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
    mainWindow.setMenu(null);
    if (process.env.VITE_DEV_SERVER_URL) {
        mainWindow.webContents.openDevTools();
        mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile("dist/react/index.html");
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
        "updateTaskProgress",
        (event: Electron.IpcMainEvent, projectId, taskId, progress) => {
            dbModel.updateTaskProgress(projectId, taskId, progress);
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
    ipcMain.on(
        "createTag",
        (
            event: IpcMainEvent,
            projectId: string,
            tagLabel: string,
            tagColor: string
        ) => {
            dbModel.createTag(projectId, tagLabel, tagColor);
            dbModel.setJson();
        }
    );
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
