import React, { useState } from "react";
import { Tag, Task } from "../../types";
import Space from "./Space";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import * as Dialog from "@radix-ui/react-dialog";
import TaskDetail from "./TaskDetail";
import Seperator from "./Seperator";
import { EditorState } from "lexical";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import InputField from "./InputField";
import TagBadge from "./Tag";

interface TaskCardProps {
    task: Task;
    grabbed?: boolean | undefined;
    onDelete?: (taskId: string) => void | undefined;
    onUpdateDesc?: (
        taskId: string,
        editorState: EditorState | undefined
    ) => void;
    onUpdateTaskName?: (taskId: string, taskName: string) => void;
    onUpdateTaskProgress?: (taskId: string, progress: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = (props: TaskCardProps) => {
    const [taskDialogState, setTaskDialogState] = useState(false);

    const [editTaskMode, setEditTaskMode] = useState<boolean>(false);

    const [taskName, setTaskName] = useState<string>("");

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

    // if (editTaskMode) {
    //     return (
    //         <div onBlur={() => setEditTaskMode(false)}>
    //             <InputField
    //                 id="task-input"
    //                 label="task"
    //                 autoFocus={true}
    //                 onValueChange={(value) => setTaskName(value)}
    //                 onKeyDown={(event) => {
    //                     if (event.key === "Enter") {
    //                         if (!props.onUpdateTaskName) return;
    //                         props.onUpdateTaskName(props.task._id, taskName);
    //                     }
    //                 }}
    //             />
    //         </div>
    //     );
    // }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={[
                "bg-white px-3 py-2 rounded-md shadow-md flex items-start group/task task-card cursor-grab relative",
                props.grabbed ? "cursor-grabbing" : "",
            ].join(" ")}
        >
            <div
                className={[
                    "absolute bottom-0 bg-green-500 h-1 left-0 rounded-bl-md",
                    props.task.progress === 100 ? "rounded-br-md" : "",
                ].join(" ")}
                style={{ width: `${props.task.progress}%` }}
            ></div>
            {editTaskMode ? (
                <div onBlur={() => setEditTaskMode(false)}>
                    <InputField
                        id="task-input"
                        label="task"
                        autoFocus={true}
                        value={props.task.task}
                        onValueChange={(value) => setTaskName(value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                if (!props.onUpdateTaskName) return;
                                props.onUpdateTaskName(
                                    props.task._id,
                                    taskName
                                );
                                setEditTaskMode(false);
                            }
                        }}
                    />
                </div>
            ) : (
                <>
                    <div
                        className="text-sm flex flex-col gap-2"
                        onDoubleClick={() => setEditTaskMode(true)}
                    >
                        <div>{props.task.task}</div>
                        <div className="w-full flex gap-1 flex-wrap">
                            {props.task.tags.map((tag: Tag) => (
                                <TagBadge
                                    key={tag._id}
                                    label={tag.label}
                                    color={tag.color}
                                ></TagBadge>
                            ))}
                        </div>
                    </div>
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
                        <Dialog.Content className="fixed top-10 left-1/2 -translate-x-1/2 bg-gray-100 z-20 rounded-md w-[80%] h-[90svh] shadow-lg cursor-auto flex flex-col">
                            {/* <MyScrollArea className="px-4 flex flex-col"> */}
                            <div className="h-full flex flex-col p-4">
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
                                        onClick={() =>
                                            setTaskDialogState(false)
                                        }
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
                                        onUpdateProgress={(progress: number) =>
                                            props.onUpdateTaskProgress?.(
                                                props.task._id,
                                                progress
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            {/* </MyScrollArea> */}
                        </Dialog.Content>
                    </Dialog.Root>
                </>
            )}
        </div>
    );
};

TaskCard.defaultProps = {
    grabbed: false,
};

export default TaskCard;
