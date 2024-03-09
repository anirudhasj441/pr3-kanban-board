export interface Task {
    _id: string;
    task: string;
    desc: string;
    status: Status;
}

export interface Project {
    _id: string;
    title: string;
    tasks: Task[];
}

export interface DB {
    projects: Project[];
}

export type Status = "todo" | "doing" | "done";
