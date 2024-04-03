import { DB, Project, Task, Status } from "../types";
import { BASE_PATH } from "./electron-main";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class DbModel {
    dbFile: string;
    db: DB;

    constructor() {
        this.dbFile = path.join(BASE_PATH, "db.json");

        if (!fs.existsSync(this.dbFile)) {
            this.db = {
                projects: [],
            };
            this.setJson();
        } else {
            this.db = this.getJson();
        }
    }
    setJson = (): void => {
        if (!fs.existsSync(this.dbFile)) {
            fs.mkdirSync(path.dirname(this.dbFile), { recursive: true });
        }
        fs.writeFileSync(this.dbFile, JSON.stringify(this.db));
    };

    getJson = (): DB => {
        const fileData: string = fs.readFileSync(this.dbFile, "utf-8");

        const data: DB = JSON.parse(fileData);

        return data;
    };

    getProject = (projectId: string): Project | undefined => {
        const project = this.db.projects.find(
            (project: Project) => project._id == projectId
        );

        return project;
    };

    getAllProject = (): Project[] => {
        const projects = this.db.projects;

        return projects;
    };

    getTask = (projectId: string, taskId: string): Task | undefined => {
        const project: Project | undefined = this.db.projects.find(
            (project: Project) => project._id == projectId
        );

        const task: Task | undefined = project?.tasks.find(
            (task: Task) => task._id == taskId
        );

        return task;
    };

    getAllTasks = (projectId: string): Task[] | undefined => {
        const project: Project | undefined = this.db.projects.find(
            (project: Project) => project._id == projectId
        );

        const tasks: Task[] | undefined = project?.tasks;

        return tasks;
    };

    createProject = (title: string): void => {
        const project: Project = {
            _id: uuidv4(),
            title: title,
            tasks: [],
        };

        this.db.projects.push(project);
    };

    createTask = (
        projectId: string,
        taskTitle: string,
        status: Status
    ): void => {
        const project: Project | undefined = this.getProject(projectId);
        if (!project) return;

        const task: Task = {
            _id: uuidv4(),
            task: taskTitle,
            desc: "",
            status: status,
        };

        project?.tasks.push(task);
    };

    updateTaskDesc = (projectId: string, taskId: string, desc: string) => {
        const task: Task | undefined = this.getTask(projectId, taskId);
        if (!task) return;
        task.desc = desc;
    };

    updateTaskName = (projectId: string, taskId: string, taskName: string) => {
        const task: Task | undefined = this.getTask(projectId, taskId);
        if (!task) return;
        task.task = taskName;
    };

    updateAllTasks = (projectId: string, tasks: Task[]) => {
        const project: Project | undefined = this.getProject(projectId);
        if (!project) return;
        project.tasks = tasks;
    };

    deleteTask = (projectId: string, taskId: string) => {
        const project: Project | undefined = this.getProject(projectId);

        const taskIndex: number | undefined = project?.tasks.findIndex(
            (task: Task) => task._id == taskId
        );

        if (typeof taskIndex !== "undefined") {
            project?.tasks.splice(taskIndex, 1);
        }
    };

    deleteProject = (projectId: string) => {
        const project: Project | undefined = this.getProject(projectId);
        const projects: Project[] = this.getAllProject();
        if (project) {
            const projectIndex: number = projects.indexOf(project);
            projects.splice(projectIndex, 1);
        }
    };

    projectExists = (projectId: string) => {
        const project: Project | undefined = this.getProject(projectId);

        return project !== undefined;
    };
}
