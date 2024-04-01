var m = Object.defineProperty;
var T = (s, e, t) => e in s ? m(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var r = (s, e, t) => (T(s, typeof e != "symbol" ? e + "" : e, t), t);
import { app as g, ipcMain as d, BrowserWindow as x } from "electron";
import p from "path";
import { fileURLToPath as j } from "url";
import l from "fs";
let u;
const b = new Uint8Array(16);
function y() {
  if (!u && (u = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !u))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return u(b);
}
const c = [];
for (let s = 0; s < 256; ++s)
  c.push((s + 256).toString(16).slice(1));
function P(s, e = 0) {
  return c[s[e + 0]] + c[s[e + 1]] + c[s[e + 2]] + c[s[e + 3]] + "-" + c[s[e + 4]] + c[s[e + 5]] + "-" + c[s[e + 6]] + c[s[e + 7]] + "-" + c[s[e + 8]] + c[s[e + 9]] + "-" + c[s[e + 10]] + c[s[e + 11]] + c[s[e + 12]] + c[s[e + 13]] + c[s[e + 14]] + c[s[e + 15]];
}
const _ = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), k = {
  randomUUID: _
};
function h(s, e, t) {
  if (k.randomUUID && !e && !s)
    return k.randomUUID();
  s = s || {};
  const n = s.random || (s.rng || y)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, e) {
    t = t || 0;
    for (let o = 0; o < 16; ++o)
      e[t + o] = n[o];
    return e;
  }
  return P(n);
}
class v {
  constructor() {
    r(this, "dbFile");
    r(this, "db");
    r(this, "setJson", () => {
      l.existsSync(this.dbFile) || l.mkdirSync(p.dirname(this.dbFile), { recursive: !0 }), l.writeFileSync(this.dbFile, JSON.stringify(this.db));
    });
    r(this, "getJson", () => {
      const e = l.readFileSync(this.dbFile, "utf-8");
      return JSON.parse(e);
    });
    r(this, "getProject", (e) => this.db.projects.find(
      (n) => n._id == e
    ));
    r(this, "getAllProject", () => this.db.projects);
    r(this, "getTask", (e, t) => {
      const n = this.db.projects.find(
        (a) => a._id == e
      );
      return n == null ? void 0 : n.tasks.find(
        (a) => a._id == t
      );
    });
    r(this, "getAllTasks", (e) => {
      const t = this.db.projects.find(
        (o) => o._id == e
      );
      return t == null ? void 0 : t.tasks;
    });
    r(this, "createProject", (e) => {
      const t = {
        _id: h(),
        title: e,
        tasks: []
      };
      this.db.projects.push(t);
    });
    r(this, "createTask", (e, t, n) => {
      const o = this.getProject(e);
      if (!o)
        return;
      const a = {
        _id: h(),
        task: t,
        desc: "",
        status: n
      };
      o == null || o.tasks.push(a);
    });
    r(this, "updateTaskDesc", (e, t, n) => {
      const o = this.getTask(e, t);
      o && (o.desc = n);
    });
    r(this, "updateTaskName", (e, t, n) => {
      const o = this.getTask(e, t);
      o && (o.task = n);
    });
    r(this, "updateAllTasks", (e, t) => {
      const n = this.getProject(e);
      n && (n.tasks = t);
    });
    r(this, "deleteTask", (e, t) => {
      const n = this.getProject(e), o = n == null ? void 0 : n.tasks.findIndex(
        (a) => a._id == t
      );
      console.log("task index: ", o), typeof o < "u" && (n == null || n.tasks.splice(o, 1));
    });
    r(this, "deleteProject", (e) => {
      const t = this.getProject(e), n = this.getAllProject();
      if (t) {
        const o = n.indexOf(t);
        n.splice(o, 1);
      }
    });
    r(this, "projectExists", (e) => this.getProject(e) !== void 0);
    this.dbFile = p.join(f, "db.json"), console.log(l.existsSync(this.dbFile)), l.existsSync(this.dbFile) ? (console.log("file exits: ", l.existsSync(this.dbFile)), this.db = this.getJson()) : (this.db = {
      projects: []
    }, this.setJson());
  }
}
console.log("path: ", p.dirname(j(import.meta.url)));
const S = j(import.meta.url), U = p.dirname(S), f = p.join(
  g.getPath("userData"),
  "kanban_board"
);
let i;
const D = () => {
  i = new x({
    width: 1e3,
    height: 600,
    useContentSize: !0,
    frame: !1,
    webPreferences: {
      preload: p.join(U, "electron-preload.mjs"),
      devTools: !0,
      contextIsolation: !0,
      nodeIntegration: !0
    }
  }), i.setMenu(null), process.env.VITE_DEV_SERVER_URL ? (i.webContents.openDevTools(), i.loadURL(process.env.VITE_DEV_SERVER_URL)) : i.loadFile("../dist/react/index.html");
};
g.whenReady().then(() => {
  D();
  const s = new v();
  d.on("close", () => {
    i == null || i.close();
  }), d.on("minimize", () => {
    i == null || i.minimize();
  }), d.on("maximize", () => {
    console.log("Maximizing: "), i != null && i.isMaximized() ? i == null || i.unmaximize() : i == null || i.maximize();
  }), d.on(
    "createProject",
    (e, t) => {
      s.createProject(t), console.log("Creating Project "), s.setJson();
    }
  ), d.on(
    "createTask",
    (e, t, n, o) => {
      s.createTask(t, n, o), console.log("Creating Task!!"), s.setJson();
    }
  ), d.on("getProjects", (e) => {
    const t = s.getAllProject();
    e.sender.send("getProjects", t);
  }), d.on("getTasks", (e, t) => {
    const n = s.getAllTasks(t);
    e.sender.send("getTasks", n);
  }), d.on(
    "deleteTask",
    (e, t, n) => {
      s.deleteTask(t, n), s.setJson();
    }
  ), d.on(
    "deleteProject",
    (e, t) => {
      s.deleteProject(t), s.setJson();
    }
  ), d.on("projectExists", (e, t) => {
    const n = s.projectExists(t);
    e.sender.send("projectExists", n);
  }), d.on(
    "updateTaskDesc",
    (e, t, n, o) => {
      s.updateTaskDesc(t, n, o), s.setJson();
    }
  ), d.on(
    "updateTaskName",
    (e, t, n, o) => {
      s.updateTaskName(t, n, o), s.setJson();
    }
  ), d.on(
    "updateAllTasks",
    (e, t, n) => {
      s.updateAllTasks(t, n), s.setJson();
    }
  );
});
g.on("window-all-closed", () => {
  process.platform !== "darwin" && g.quit();
});
export {
  f as BASE_PATH
};
