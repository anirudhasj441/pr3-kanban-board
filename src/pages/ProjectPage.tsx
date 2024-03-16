// import React, { useCallback, useEffect, useState, useRef } from "react";
import React, { useCallback, useEffect, useRef } from "react";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import Board from "../components/Board";
// import { Task } from "../../types";

const ProjectPage: React.FC = () => {
    const effectRan = useRef(false);

    const navigate: NavigateFunction = useNavigate();

    // const [todoTasks, setTodoTasks] = useState<Task[]>([]);
    // const [doingTasks, setDoingTasks] = useState<Task[]>([]);
    // const [doneTasks, setDoneTasks] = useState<Task[]>([]);
    const { project_id } = useParams();

    // const getTasks = useCallback(() => {
    //     if (typeof window !== "undefined") electronAPI.getTasks(project_id);
    // }, [project_id]);

    // const handleGetTasks = useCallback((tasks: Task[]) => {
    //     const todoTasks: Task[] = tasks.filter(
    //         (task: Task) => task.status == "todo"
    //     );
    //     const doingTaks: Task[] = tasks.filter(
    //         (task: Task) => task.status == "doing"
    //     );
    //     const doneTasks: Task[] = tasks.filter(
    //         (task: Task) => task.status == "done"
    //     );

    //     setTodoTasks(todoTasks);
    //     setDoingTasks(doingTaks);
    //     setDoneTasks(doneTasks);
    // }, []);

    const handleProjectExists = useCallback(
        (result: boolean) => {
            if (!result) {
                console.log("project exists: ", result);
                navigate("/");
            }
        },
        [navigate]
    );

    useEffect(() => {
        electronAPI.projectExists(project_id);
        electronAPI.receive("projectExists", handleProjectExists);
        // if (effectRan.current == true) {
        // }
        return () => {
            effectRan.current = true;
        };
    }, [handleProjectExists]);

    return (
        <div className="flex gap-5 h-full">
            {project_id ? (
                <>
                    <Board
                        title="Todo"
                        project_id={project_id}
                        status="todo"
                        color_class="border-gray-500"
                    />
                    <Board
                        title="In Progress"
                        project_id={project_id}
                        status="doing"
                        color_class="border-indigo-700"
                    />
                    <Board
                        title="Done"
                        project_id={project_id}
                        status="done"
                        color_class="border-green-500"
                    />
                </>
            ) : null}
        </div>
    );
};

export default ProjectPage;
