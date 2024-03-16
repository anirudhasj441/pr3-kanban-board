import React from "react";
import { Task } from "../../types";
import Space from "./Space";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

interface TaskCardProps {
    task: Task;
    onDelete?: (taskId: string) => void | undefined;
}

const TaskCard: React.FC<TaskCardProps> = (props: TaskCardProps) => {
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
        </div>
    );
};

export default TaskCard;
