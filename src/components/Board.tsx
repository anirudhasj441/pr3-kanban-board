import React, { useEffect, useRef, useState, useCallback } from "react";
import { Status, Task } from "../../types";
import Space from "./Space";
import { Icon } from "@iconify-icon/react";
import TaskCard from "./TaskCard";
import MyScrollArea from "./ScrollArea";
import CreateTaskForm from "./CreateTaskForm";

interface BoardProps {
    title: string;
    project_id: string;
    status: Status;
    color_class?: string | undefined;
}

const Board: React.FC<BoardProps> = (props: BoardProps) => {
    const effectRan = useRef(false);

    const [showForm, setShowForm] = useState<boolean>(false);

    const [tasks, setTasks] = useState<Task[]>([]);

    const getTasks = useCallback(() => {
        console.log("Tasks fetchning ");
        if (typeof window !== "undefined")
            electronAPI.getTasks(props.project_id);
    }, [props.project_id]);

    const createTask = useCallback(
        (taskTitle: string) => {
            console.log("CREATING TASK!!!");
            if (taskTitle === "") return;
            electronAPI.createTask(props.project_id, taskTitle, props.status);
            setShowForm(false);
            getTasks();
        },
        [props, setShowForm, getTasks]
    );

    const handleGetTasks = useCallback(
        (tasks: Task[]) => {
            const taskList = tasks.filter(
                (task: Task) => task.status == props.status
            );
            setTasks(taskList);
        },
        [setTasks, props.status]
    );

    const handleOnDelete = useCallback(
        (taskId: string) => {
            console.log("task id: ", taskId);
            electronAPI.deleteTask(props.project_id, taskId);
            getTasks();
        },
        [props, getTasks]
    );

    useEffect(() => {
        if (effectRan.current) {
            getTasks();
            electronAPI.receive("getTasks", handleGetTasks);
        }
        return () => {
            effectRan.current = true;
        };
    }, [getTasks, handleGetTasks]);

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
                    {tasks.length}
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
            <div className="board group flex-1 overflow-hidden">
                <MyScrollArea className="rounded-md h-full">
                    <ul className="flex flex-col gap-2">
                        {tasks.map((task: Task) => (
                            <li key={task._id}>
                                <TaskCard
                                    task={task}
                                    onDelete={handleOnDelete}
                                />
                            </li>
                        ))}
                        {showForm ? (
                            <li
                                id="task-form"
                                onBlur={() => {
                                    setShowForm(false);
                                }}
                            >
                                <CreateTaskForm onCreate={createTask} />
                            </li>
                        ) : null}
                        <li>
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
                        </li>
                    </ul>
                </MyScrollArea>
            </div>
        </div>
    );
};

Board.defaultProps = {
    color_class: "border-indigo-700",
};

export default Board;
