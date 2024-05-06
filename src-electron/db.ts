import { DB, Project, Task, Status, Tag, TagColor } from "../types";
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

    /**
     * Returns tags of project
     *
     * @param projectId - project id of project.
     * @returns list of tags if present else empty list
     */
    getAllTags = (projectId: string): Tag[] => {
        const project: Project | undefined = this.getProject(projectId);

        const tags: Tag[] | undefined = project?.tags;

        return tags || [];
    };

    /**
     * returns tag attached to given task
     * @param projectId - id of project
     * @param taskId - id of task
     * @returns list of tags if present else empty list
     */
    getTaskTags = (projectId: string, taskId: string): Tag[] => {
        const task: Task | undefined = this.getTask(projectId, taskId);

        const tags: Tag[] | undefined = task?.tags;

        return tags || [];
    };

    createProject = (title: string): void => {
        const project: Project = {
            _id: uuidv4(),
            title: title,
            tasks: [],
            tags: [],
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
            progress: 0,
            tags: [],
        };

        project?.tasks.push(task);
    };

    /**
     * Create tag for specified project
     * @param projectId: id of a project for that tag is created
     * @param tagLabel: label of tag
     * @param tagColor: color of tag batch
     */
    createTag = (
        projectId: string,
        tagLabel: string,
        tagColor: TagColor
    ): void => {
        const project: Project | undefined = this.getProject(projectId);
        if (!project) return;
        const tag: Tag = {
            _id: uuidv4(),
            label: tagLabel,
            color: tagColor,
        };
        if (!project?.tags) {
            project.tags = [];
        }
        project?.tags.push(tag);
    };

    updateTaskDesc = (
        projectId: string,
        taskId: string,
        desc: string
    ): void => {
        const task: Task | undefined = this.getTask(projectId, taskId);
        if (!task) return;
        task.desc = desc;
    };

    updateTaskName = (
        projectId: string,
        taskId: string,
        taskName: string
    ): void => {
        const task: Task | undefined = this.getTask(projectId, taskId);
        if (!task) return;
        task.task = taskName;
    };

    updateTaskProgress = (
        projectId: string,
        taskId: string,
        progress: number
    ): void => {
        const task: Task | undefined = this.getTask(projectId, taskId);

        if (!task) return;

        task.progress = progress;
    };

    /**
     * Attach tag to given task in given project
     * @param projectId - id of project
     * @param taskId - id of tag
     * @param tag - tag which to be attached
     * @returns
     */
    attachTagToTask = (projectId: string, taskId: string, tag: Tag): void => {
        const task: Task | undefined = this.getTask(projectId, taskId);
        if (!task) return;
        if (!task.tags) {
            // initialize empty tags if not exists
            task.tags = [];
        }
        task.tags.push(tag);
    };

    /**
     * detach tag from given task in given project
     * @param projectId - id of project
     * @param taskId - id of task
     * @param aTag - tag to be detached
     * @returns
     */
    detachTagFromTask = (
        projectId: string,
        taskId: string,
        aTag: Tag
    ): void => {
        const task: Task | undefined = this.getTask(projectId, taskId);
        if (!task) return;
        const tagIndex: number | undefined = task.tags?.findIndex(
            (tag: Tag) => tag._id === aTag._id
        );
        if (typeof tagIndex !== "undefined") {
            task.tags.splice(tagIndex, 1);
        }
    };

    updateAllTasks = (projectId: string, tasks: Task[]): void => {
        const project: Project | undefined = this.getProject(projectId);
        if (!project) return;
        project.tasks = tasks;
    };

    deleteTask = (projectId: string, taskId: string): void => {
        const project: Project | undefined = this.getProject(projectId);

        const taskIndex: number | undefined = project?.tasks.findIndex(
            (task: Task) => task._id == taskId
        );

        if (typeof taskIndex !== "undefined") {
            project?.tasks.splice(taskIndex, 1);
        }
    };

    deleteProject = (projectId: string): void => {
        const project: Project | undefined = this.getProject(projectId);
        const projects: Project[] = this.getAllProject();
        if (project) {
            const projectIndex: number = projects.indexOf(project);
            projects.splice(projectIndex, 1);
        }
    };

    projectExists = (projectId: string): boolean => {
        const project: Project | undefined = this.getProject(projectId);

        return project !== undefined;
    };
}
