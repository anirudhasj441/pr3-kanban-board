import React, { useState } from "react";
import { Task } from "../../types";
import Space from "./Space";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import * as Dialog from "@radix-ui/react-dialog";
import TaskDetail from "./TaskDetail";
import Seperator from "./Seperator";
import { EditorState } from "lexical";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MyScrollArea from "./ScrollArea";

interface TaskCardProps {
    task: Task;
    grabbed?: boolean | undefined;
    onDelete?: (taskId: string) => void | undefined;
    onUpdateDesc?: (
        taskId: string,
        editorState: EditorState | undefined
    ) => void;
}

const TaskCard: React.FC<TaskCardProps> = (props: TaskCardProps) => {
    const [taskDialogState, setTaskDialogState] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props.task._id,
        data: {
            type: "TASK",
            task: props.task,
        },
        disabled: taskDialogState,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className={[
                    "bg-white px-3 py-2 opacity-30 rounded-md shadow-md flex items-center group/task task-card cursor-grab relative",
                ].join(" ")}
            >
                <div className="text-sm">{props.task.task}</div>
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={[
                "bg-white px-3 py-2 rounded-md shadow-md flex items-start group/task task-card cursor-grab",
                props.grabbed ? "cursor-grabbing" : "",
            ].join(" ")}
        >
            <div className="text-sm">{props.task.task}</div>
            <Space />
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
                    className="fixed backdrop-blur-sm transition-all duration-900 ease-linear z-10"
                    style={{ inset: 0 }}
                />
                <Dialog.Content className="fixed top-10 left-1/2 -translate-x-1/2 bg-gray-100 py-4 z-20 rounded-md w-[80%] h-[90svh] shadow-lg cursor-auto flex flex-col">
                    <MyScrollArea className="px-4">
                        <Dialog.Title className="flex">
                            <div className="text-2xl text-slate-600">
                                {props.task.task}
                            </div>
                            <Space></Space>
                            <button
                                className="hover:bg-gray-300 p-1 rounded-md invisible group-hover/task:visible transition duration-800 ease-in-out"
                                onClick={() =>
                                    props.onDelete
                                        ? props.onDelete(props.task._id)
                                        : undefined
                                }
                            >
                                <Icon
                                    icon="ic:baseline-delete-forever"
                                    width={25}
                                    height={25}
                                    className="block text-slate-600"
                                />
                            </button>
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
                        <div className="flex-grow">
                            <TaskDetail
                                task={props.task}
                                onUpdateDesc={(editorState) =>
                                    props.onUpdateDesc &&
                                    props.onUpdateDesc(
                                        props.task._id,
                                        editorState
                                    )
                                }
                            />
                        </div>
                    </MyScrollArea>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    );
};

TaskCard.defaultProps = {
    grabbed: false,
};

export default TaskCard;
