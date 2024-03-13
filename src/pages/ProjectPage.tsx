import React from "react";
import { useParams } from "react-router-dom";

const ProjectPage: React.FC = () => {
    const { project_id } = useParams();
    return (
        <div className="flex gap-5 h-full">
            <div className="board rounded-md flex-1 h-full bg-gray-200">
                <div className="text-2xl">Todo</div>
            </div>
            <div className="board rounded-md flex-1 h-full bg-gray-200">
                <div className="text-2xl">In progress</div>
            </div>
            <div className="board rounded-md flex-1 h-full bg-gray-200">
                <div className="text-2xl">Done</div>
            </div>
        </div>
    );
};

export default ProjectPage;
