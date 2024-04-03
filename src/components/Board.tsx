import React, { useEffect, useRef, useState, useCallback } from "react";
import { Status, Task } from "../../types";
import Space from "./Space";
import { Icon } from "@iconify-icon/react";
import TaskCard from "./TaskCard";
import MyScrollArea from "./ScrollArea";
import CreateTaskForm from "./CreateTaskForm";
import { EditorState } from "lexical";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

interface BoardProps {
    title: string;
    project_id: string;
    status: Status;
    tasks: Task[];
    getTasks: () => void;
    color_class?: string | undefined;
}

const Board: React.FC<BoardProps> = (props: BoardProps) => {
    const effectRan = useRef(false);

    const [showForm, setShowForm] = useState<boolean>(false);

    const createTask = useCallback(
        (taskTitle: string) => {
            if (taskTitle === "") return;
            electronAPI.createTask(props.project_id, taskTitle, props.status);
            setShowForm(false);
            props.getTasks();
        },
        [props, setShowForm]
    );

    const handleOnDelete = useCallback(
        (taskId: string) => {
            electronAPI.deleteTask(props.project_id, taskId);
            props.getTasks();
        },
        [props]
    );

    const handleOnUpdateTaskDesc = useCallback(
        (taskId: string, editorState: EditorState | undefined) => {
            electronAPI.updateTaskDesc(
                props.project_id,
                taskId,
                JSON.stringify(editorState?.toJSON())
            );
            props.getTasks();
        },
        [props]
    );

    const handleOnUpdateTaskName = useCallback(
        (taskId: string, taskName: string) => {
            electronAPI.updateTaskName(props.project_id, taskId, taskName);
            props.getTasks();
        },
        [props]
    );

    const { setNodeRef } = useDroppable({
        id: props.status,
        data: {
            type: "BOARD",
            status: props.status,
        },
    });

    useEffect(() => {
        // if (effectRan.current) {

        // }
        return () => {
            effectRan.current = true;
        };
    }, []);

    useEffect(() => {
        if (showForm) {
            document.getElementById("task-form")?.focus();
        }
    }, [showForm]);

    return (
        <div className="flex flex-col h-full flex-1 gap-5">
            <div
                className={`
                    header
                    px-3
                    py-2
                    border-t-4
                    bg-white
                    shadow-md
                    rounded-md
                    flex
                    items-center
                    gap-2
                    text-sm
                    group
                    ${props.color_class}
                `}
            >
                <h6 className="">{props.title}</h6>
                <div className="badge px-2 py-0  rounded-xl border-[1px] border-slate-300">
                    {props.tasks.length}
                </div>
                <Space />
                <button
                    className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-300 rounded-md"
                    onClick={() => setShowForm(true)}
                >
                    <Icon
                        icon="material-symbols:add"
                        className="block text-slate-600"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
            <MyScrollArea className="rounded-md board group flex-grow">
                <div className="flex flex-col gap-2 h-full" ref={setNodeRef}>
                    <SortableContext
                        items={props.tasks.map((task: Task) => task._id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {props.tasks.map((task: Task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onDelete={handleOnDelete}
                                onUpdateDesc={handleOnUpdateTaskDesc}
                                onUpdateTaskName={handleOnUpdateTaskName}
                            />
                        ))}
                    </SortableContext>
                    {showForm ? (
                        <div
                            id="task-form"
                            onBlur={() => {
                                setShowForm(false);
                            }}
                        >
                            <CreateTaskForm onCreate={createTask} />
                        </div>
                    ) : null}
                    <div>
                        <button
                            className="
                                    text-sm
                                    text-slate-600
                                    opacity-0
                                    bg-gray-100
                                    hover:bg-gray-300
                                    group-hover:opacity-100
                                    px-2 py-2 w-max
                                    rounded-md
                                    transition-opacity
                                    duration-500
                                    flex
                                    gap-1
                                    items-center
                                "
                            onClick={() => setShowForm(true)}
                        >
                            <Icon
                                icon="material-symbols:add"
                                className="block"
                            />
                            <div>New Task</div>
                        </button>
                    </div>
                </div>
            </MyScrollArea>
        </div>
    );
};

Board.defaultProps = {
    color_class: "border-indigo-700",
};

export default Board;
