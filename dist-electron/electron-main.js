var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { app, ipcMain, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
class DbModel {
  constructor() {
    __publicField(this, "dbFile");
    __publicField(this, "db");
    __publicField(this, "setJson", () => {
      if (!fs.existsSync(this.dbFile)) {
        fs.mkdirSync(path.dirname(this.dbFile), { recursive: true });
      }
      fs.writeFileSync(this.dbFile, JSON.stringify(this.db));
    });
    __publicField(this, "getJson", () => {
      const fileData = fs.readFileSync(this.dbFile, "utf-8");
      const data = JSON.parse(fileData);
      return data;
    });
    __publicField(this, "getProject", (projectId) => {
      const project = this.db.projects.find(
        (project2) => project2._id == projectId
      );
      return project;
    });
    __publicField(this, "getAllProject", () => {
      const projects = this.db.projects;
      return projects;
    });
    __publicField(this, "getTask", (projectId, taskId) => {
      const project = this.db.projects.find(
        (project2) => project2._id == projectId
      );
      const task = project == null ? void 0 : project.tasks.find(
        (task2) => task2._id == taskId
      );
      return task;
    });
    __publicField(this, "getAllTasks", (projectId) => {
      const project = this.db.projects.find(
        (project2) => project2._id == projectId
      );
      const tasks = project == null ? void 0 : project.tasks;
      return tasks;
    });
    __publicField(this, "createProject", (title) => {
      const project = {
        _id: v4(),
        title,
        tasks: []
      };
      this.db.projects.push(project);
    });
    __publicField(this, "createTask", (projectId, taskTitle, status) => {
      const project = this.getProject(projectId);
      if (!project)
        return;
      const task = {
        _id: v4(),
        task: taskTitle,
        desc: "",
        status
      };
      project == null ? void 0 : project.tasks.push(task);
    });
    __publicField(this, "updateTaskDesc", (projectId, taskId, desc) => {
      const task = this.getTask(projectId, taskId);
      if (!task)
        return;
      task.desc = desc;
    });
    __publicField(this, "updateTaskName", (projectId, taskId, taskName) => {
      const task = this.getTask(projectId, taskId);
      if (!task)
        return;
      task.task = taskName;
    });
    __publicField(this, "updateAllTasks", (projectId, tasks) => {
      const project = this.getProject(projectId);
      if (!project)
        return;
      project.tasks = tasks;
    });
    __publicField(this, "deleteTask", (projectId, taskId) => {
      const project = this.getProject(projectId);
      const taskIndex = project == null ? void 0 : project.tasks.findIndex(
        (task) => task._id == taskId
      );
      console.log("task index: ", taskIndex);
      if (typeof taskIndex !== "undefined") {
        project == null ? void 0 : project.tasks.splice(taskIndex, 1);
      }
    });
    __publicField(this, "deleteProject", (projectId) => {
      const project = this.getProject(projectId);
      const projects = this.getAllProject();
      if (project) {
        const projectIndex = projects.indexOf(project);
        projects.splice(projectIndex, 1);
      }
    });
    __publicField(this, "projectExists", (projectId) => {
      const project = this.getProject(projectId);
      return project !== void 0;
    });
    this.dbFile = path.join(BASE_PATH, "db.json");
    console.log(fs.existsSync(this.dbFile));
    if (!fs.existsSync(this.dbFile)) {
      this.db = {
        projects: []
      };
      this.setJson();
    } else {
      console.log("file exits: ", fs.existsSync(this.dbFile));
      this.db = this.getJson();
    }
  }
}
console.log("path: ", path.dirname(fileURLToPath(import.meta.url)));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_PATH = path.join(
  app.getPath("userData"),
  "kanban_board"
);
let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1e3,
    height: 600,
    useContentSize: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "electron-preload.mjs"),
      devTools: true,
      contextIsolation: true,
      nodeIntegration: true
    }
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
    mainWindow == null ? void 0 : mainWindow.close();
  });
  ipcMain.on("minimize", () => {
    mainWindow == null ? void 0 : mainWindow.minimize();
  });
  ipcMain.on("maximize", () => {
    console.log("Maximizing: ");
    if (mainWindow == null ? void 0 : mainWindow.isMaximized()) {
      mainWindow == null ? void 0 : mainWindow.unmaximize();
    } else {
      mainWindow == null ? void 0 : mainWindow.maximize();
    }
  });
  ipcMain.on(
    "createProject",
    (evt, projectTitle) => {
      dbModel.createProject(projectTitle);
      console.log("Creating Project ");
      dbModel.setJson();
    }
  );
  ipcMain.on(
    "createTask",
    (event, projectId, taskTitle, status) => {
      dbModel.createTask(projectId, taskTitle, status);
      console.log("Creating Task!!");
      dbModel.setJson();
    }
  );
  ipcMain.on("getProjects", (event) => {
    const projects = dbModel.getAllProject();
    event.sender.send("getProjects", projects);
  });
  ipcMain.on("getTasks", (event, projectId) => {
    const tasks = dbModel.getAllTasks(projectId);
    event.sender.send("getTasks", tasks);
  });
  ipcMain.on(
    "deleteTask",
    (event, projectId, taskId) => {
      dbModel.deleteTask(projectId, taskId);
      dbModel.setJson();
    }
  );
  ipcMain.on(
    "deleteProject",
    (event, projectId) => {
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
    (event, projectId, taskId, desc) => {
      dbModel.updateTaskDesc(projectId, taskId, desc);
      dbModel.setJson();
    }
  );
  ipcMain.on(
    "updateTaskName",
    (event, projectId, taskId, taskName) => {
      dbModel.updateTaskName(projectId, taskId, taskName);
      dbModel.setJson();
    }
  );
  ipcMain.on(
    "updateAllTasks",
    (event, projectId, tasks) => {
      dbModel.updateAllTasks(projectId, tasks);
      dbModel.setJson();
    }
  );
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin")
    app.quit();
});
export {
  BASE_PATH
};
