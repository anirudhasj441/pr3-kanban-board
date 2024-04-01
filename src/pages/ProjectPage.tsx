// import React, { useCallback, useEffect, useState, useRef } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import Board from "../components/Board";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Task } from "../../types";
import TaskCard from "../components/TaskCard";

const ProjectPage: React.FC = () => {
    const effectRan = useRef(false);

    const navigate: NavigateFunction = useNavigate();

    const { project_id } = useParams();

    const [tasks, setTasks] = useState<Task[]>([]);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const handleProjectExists = useCallback(
        (result: boolean) => {
            if (!result) {
                console.log("project exists: ", result);
                navigate("/");
            }
        },
        [navigate]
    );

    const getTasks = useCallback(() => {
        console.log("Tasks fetchning ");
        if (!project_id) return;
        electronAPI.getTasks(project_id);
    }, [project_id]);

    const handleGetTasks = useCallback(
        (tasks: Task[]) => {
            setTasks(tasks);
        },
        [setTasks]
    );

    useEffect(() => {
        if (effectRan.current == true) {
            if (!project_id) return;
            electronAPI.projectExists(project_id);
            electronAPI.receive("projectExists", handleProjectExists);
            getTasks();
            electronAPI.receive("getTasks", handleGetTasks);
        }
        return () => {
            effectRan.current = true;
        };
    }, [handleProjectExists, getTasks, handleGetTasks, project_id]);

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event;

            const activeTask: Task | undefined = tasks.find(
                (task: Task) => task._id === active.id
            );
            const overTask: Task | undefined = tasks.find(
                (task: Task) => task._id === over?.id
            );

            if (!activeTask || !overTask) return;

            const tempTasks = arrayMove(
                tasks,
                tasks.indexOf(activeTask),
                tasks.indexOf(overTask)
            );

            setTasks(tempTasks);
            if (!project_id) return;
            electronAPI.updateAllTasks(project_id, tempTasks);
        },
        [tasks, setTasks, project_id]
    );

    const handleDragStart = useCallback(
        (event: DragStartEvent) => {
            setActiveTask(event.active.data.current?.task);
        },
        [setActiveTask]
    );

    const handleDragOver = useCallback(
        (event: DragOverEvent) => {
            const { active, over } = event;

            if (!over) return;

            const activeTask: Task | undefined = tasks.find(
                (task: Task) => task._id === active.id
            );

            if (!activeTask) return;

            const status =
                over.data.current?.type === "TASK"
                    ? over.data.current?.task.status
                    : over.data.current?.status;

            const taskIndex: number | undefined = tasks.findIndex(
                (task: Task) => task._id === activeTask._id
            );

            const tempTask: Task[] = [...tasks];

            tempTask[taskIndex].status = status;
            setTasks(tempTask);
        },
        [tasks, setTasks]
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
    );

    return (
        <div className="flex gap-5 h-full">
            {project_id ? (
                <DndContext
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    sensors={sensors}
                >
                    <Board
                        title="Todo"
                        project_id={project_id}
                        status="todo"
                        tasks={tasks.filter(
                            (task: Task) => task.status === "todo"
                        )}
                        getTasks={getTasks}
                        color_class="border-gray-500"
                    />
                    <Board
                        title="In Progress"
                        project_id={project_id}
                        status="doing"
                        getTasks={getTasks}
                        tasks={tasks.filter(
                            (task: Task) => task.status === "doing"
                        )}
                        color_class="border-indigo-700"
                    />
                    <Board
                        title="Done"
                        project_id={project_id}
                        status="done"
                        getTasks={() => getTasks()}
                        tasks={tasks.filter(
                            (task: Task) => task.status === "done"
                        )}
                        color_class="border-green-500"
                    />
                    <DragOverlay>
                        {activeTask && (
                            <TaskCard
                                task={activeTask}
                                grabbed={true}
                            ></TaskCard>
                        )}
                    </DragOverlay>
                </DndContext>
            ) : null}
        </div>
    );
};

export default ProjectPage;
