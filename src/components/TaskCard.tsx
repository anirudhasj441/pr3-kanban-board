import React, { useState } from "react";
import { Task } from "../../types";
import Space from "./Space";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import * as Dialog from "@radix-ui/react-dialog";
import TaskDetail from "./TaskDetail";
import Seperator from "./Seperator";
import { EditorState } from "lexical";

interface TaskCardProps {
    task: Task;
    onDelete?: (taskId: string) => void | undefined;
    onUpdateDesc: (
        taskId: string,
        editorState: EditorState | undefined
    ) => void;
}

const TaskCard: React.FC<TaskCardProps> = (props: TaskCardProps) => {
    const [taskDialogState, setTaskDialogState] = useState(false);
    return (
        <div className="bg-white px-3 py-2 rounded-md shadow-md flex items-center group/task task-card">
            <div className="text-sm">{props.task.task}</div>
            <Space />
            <button
                className="hover:bg-gray-300 p-1 rounded-md invisible group-hover/task:visible transition duration-800 ease-in-out"
                onClick={() =>
                    props.onDelete ? props.onDelete(props.task._id) : undefined
                }
            >
                <Icon
                    icon="ic:baseline-delete-forever"
                    width={20}
                    height={20}
                    className="block text-slate-600"
                />
            </button>
            <Dialog.Root
                open={taskDialogState}
                onOpenChange={setTaskDialogState}
            >
                <Dialog.Trigger asChild>
                    <button className="hover:bg-gray-300 p-1 rounded-md invisible group-hover/task:visible transition duration-800 ease-in-out">
                        <Icon
                            icon="material-symbols:more-horiz"
                            width={20}
                            height={20}
                            className="block text-slate-600"
                        />
                    </button>
                </Dialog.Trigger>
                <Dialog.Overlay
                    className="fixed backdrop-blur-sm transition-all duration-900 ease-linear z-50"
                    style={{ inset: 0 }}
                />
                <Dialog.Content className="fixed top-10 left-1/2 -translate-x-1/2 bg-gray-100 p-4 z-50 rounded-md w-[80%] shadow-lg">
                    <Dialog.Title className="flex">
                        <div className="text-2xl text-slate-600">
                            {props.task.task}
                        </div>
                        <Space></Space>
                        <button
                            className="hover:bg-gray-300 p-1 rounded-md transition duration-800 ease-in-out"
                            onClick={() => setTaskDialogState(false)}
                        >
                            <Icon
                                icon="material-symbols:close"
                                width={25}
                                height={25}
                                className="block text-slate-600"
                            />
                        </button>
                    </Dialog.Title>
                    <Seperator />
                    <TaskDetail
                        task={props.task}
                        onUpdateDesc={(editorState) =>
                            props.onUpdateDesc(props.task._id, editorState)
                        }
                    />
                </Dialog.Content>
            </Dialog.Root>
        </div>
    );
};

export default TaskCard;
