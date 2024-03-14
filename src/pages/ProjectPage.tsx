import React from "react";
import { useParams } from "react-router-dom";
import Board from "../components/Board";
import { Task } from "../../types";

const ProjectPage: React.FC = () => {
    const { project_id } = useParams();
    const tasks: Task[] = [
        {
            _id: "schdvagcvjdh-scds-dvsvs",
            task: "Task 1",
            desc: "",
            status: "todo",
        },
        {
            _id: "schdacdgcvjdh-scds-dvsvs",
            task: "Task 1",
            desc: "",
            status: "todo",
        },
    ];
    return (
        <div className="flex gap-5 h-full">
            <Board title="Todo" tasks={tasks} color_class="border-indigo-700" />
            <Board
                title="In Progress"
                tasks={[]}
                color_class="border-gray-500"
            />
            <Board title="Done" tasks={[]} color_class="border-green-500" />
        </div>
    );
};

export default ProjectPage;
