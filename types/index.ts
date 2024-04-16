import { ElementFormatType, TextFormatType } from "lexical";
import React from "react";

export interface Tag {
    _id: string;
    label: string;
    color: string;
}

export interface Task {
    _id: string;
    task: string;
    desc: string;
    status: Status;
    progress: number;
    tags: Tag[];
}

export interface Project {
    _id: string;
    title: string;
    tasks: Task[];
    tags: Tag[];
}

export interface DB {
    projects: Project[];
}

export type Status = "todo" | "doing" | "done";

export interface TextFormatButton {
    id: number;
    icon: React.ReactElement;
    command: TextFormatType;
}

export interface ElementFormatButton {
    id: number;
    icon: React.ReactElement;
    command: ElementFormatType;
}
