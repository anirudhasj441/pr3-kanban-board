import React from "react";
import { Task } from "../../types";

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = (props: TaskCardProps) => {
    return (
        <div className="bg-white px-3 py-4 rounded-md shadow-md">
            <div className="text-sm">{props.task.task}</div>
        </div>
    );
};

export default TaskCard;
