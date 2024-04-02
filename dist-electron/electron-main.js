var m = Object.defineProperty;
var T = (s, e, t) => e in s ? m(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var c = (s, e, t) => (T(s, typeof e != "symbol" ? e + "" : e, t), t);
import { app as g, ipcMain as d, BrowserWindow as x } from "electron";
import p from "path";
import { fileURLToPath as b } from "url";
import l from "fs";
let u;
const y = new Uint8Array(16);
function P() {
  if (!u && (u = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !u))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return u(y);
}
const r = [];
for (let s = 0; s < 256; ++s)
  r.push((s + 256).toString(16).slice(1));
function _(s, e = 0) {
  return r[s[e + 0]] + r[s[e + 1]] + r[s[e + 2]] + r[s[e + 3]] + "-" + r[s[e + 4]] + r[s[e + 5]] + "-" + r[s[e + 6]] + r[s[e + 7]] + "-" + r[s[e + 8]] + r[s[e + 9]] + "-" + r[s[e + 10]] + r[s[e + 11]] + r[s[e + 12]] + r[s[e + 13]] + r[s[e + 14]] + r[s[e + 15]];
}
const v = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), k = {
  randomUUID: v
};
function h(s, e, t) {
  if (k.randomUUID && !e && !s)
    return k.randomUUID();
  s = s || {};
  const o = s.random || (s.rng || P)();
  if (o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, e) {
    t = t || 0;
    for (let n = 0; n < 16; ++n)
      e[t + n] = o[n];
    return e;
  }
  return _(o);
}
class S {
  constructor() {
    c(this, "dbFile");
    c(this, "db");
    c(this, "setJson", () => {
      l.existsSync(this.dbFile) || l.mkdirSync(p.dirname(this.dbFile), { recursive: !0 }), l.writeFileSync(this.dbFile, JSON.stringify(this.db));
    });
    c(this, "getJson", () => {
      const e = l.readFileSync(this.dbFile, "utf-8"), t = JSON.parse(e);
      return console.log("DATA: ", t), t;
    });
    c(this, "getProject", (e) => this.db.projects.find(
      (o) => o._id == e
    ));
    c(this, "getAllProject", () => this.db.projects);
    c(this, "getTask", (e, t) => {
      const o = this.db.projects.find(
        (a) => a._id == e
      );
      return o == null ? void 0 : o.tasks.find(
        (a) => a._id == t
      );
    });
    c(this, "getAllTasks", (e) => {
      const t = this.db.projects.find(
        (n) => n._id == e
      );
      return t == null ? void 0 : t.tasks;
    });
    c(this, "createProject", (e) => {
      const t = {
        _id: h(),
        title: e,
        tasks: []
      };
      this.db.projects.push(t);
    });
    c(this, "createTask", (e, t, o) => {
      const n = this.getProject(e);
      if (!n)
        return;
      const a = {
        _id: h(),
        task: t,
        desc: "",
        status: o
      };
      n == null || n.tasks.push(a);
    });
    c(this, "updateTaskDesc", (e, t, o) => {
      const n = this.getTask(e, t);
      n && (n.desc = o);
    });
    c(this, "updateTaskName", (e, t, o) => {
      const n = this.getTask(e, t);
      n && (n.task = o);
    });
    c(this, "updateAllTasks", (e, t) => {
      const o = this.getProject(e);
      o && (o.tasks = t);
    });
    c(this, "deleteTask", (e, t) => {
      const o = this.getProject(e), n = o == null ? void 0 : o.tasks.findIndex(
        (a) => a._id == t
      );
      console.log("task index: ", n), typeof n < "u" && (o == null || o.tasks.splice(n, 1));
    });
    c(this, "deleteProject", (e) => {
      const t = this.getProject(e), o = this.getAllProject();
      if (t) {
        const n = o.indexOf(t);
        o.splice(n, 1);
      }
    });
    c(this, "projectExists", (e) => this.getProject(e) !== void 0);
    this.dbFile = p.join(j, "db.json"), console.log(l.existsSync(this.dbFile)), l.existsSync(this.dbFile) ? (console.log("file exits: ", l.existsSync(this.dbFile)), this.db = this.getJson()) : (this.db = {
      projects: []
    }, this.setJson());
  }
}
const D = b(import.meta.url), U = p.dirname(D), j = p.join(
  g.getPath("userData"),
  "kanban_board"
);
console.log("path: ", j);
let i;
const f = () => {
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
  }), i.setMenu(null), i.webContents.openDevTools(), process.env.VITE_DEV_SERVER_URL ? i.loadURL(process.env.VITE_DEV_SERVER_URL) : i.loadFile("dist/react/index.html");
};
g.whenReady().then(() => {
  f();
  const s = new S();
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
    (e, t, o, n) => {
      s.createTask(t, o, n), console.log("Creating Task!!"), s.setJson();
    }
  ), d.on("getProjects", (e) => {
    const t = s.getAllProject();
    console.log("project: ", t), e.sender.send("getProjects", t);
  }), d.on("getTasks", (e, t) => {
    const o = s.getAllTasks(t);
    e.sender.send("getTasks", o);
  }), d.on(
    "deleteTask",
    (e, t, o) => {
      s.deleteTask(t, o), s.setJson();
    }
  ), d.on(
    "deleteProject",
    (e, t) => {
      s.deleteProject(t), s.setJson();
    }
  ), d.on("projectExists", (e, t) => {
    const o = s.projectExists(t);
    e.sender.send("projectExists", o);
  }), d.on(
    "updateTaskDesc",
    (e, t, o, n) => {
      s.updateTaskDesc(t, o, n), s.setJson();
    }
  ), d.on(
    "updateTaskName",
    (e, t, o, n) => {
      s.updateTaskName(t, o, n), s.setJson();
    }
  ), d.on(
    "updateAllTasks",
    (e, t, o) => {
      s.updateAllTasks(t, o), s.setJson();
    }
  );
});
g.on("window-all-closed", () => {
  process.platform !== "darwin" && g.quit();
});
export {
  j as BASE_PATH
};
