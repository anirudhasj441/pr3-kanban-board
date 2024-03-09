import React, { useCallback, useRef } from "react";
import { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import CreateProjectForm from "./CreateProjectForm";
import { Button } from "@radix-ui/themes";
import { Project } from "../../types";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Dialog from "@radix-ui/react-dialog";

const LeftDrawer: React.FC = () => {
    const effectRan = useRef(false);
    const [dialogState, setDailogState] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);

    const getProjects = useCallback(() => {
        console.log(typeof window);
        if (typeof window !== "undefined") electronAPI.getProjects();
    }, []);

    const handleGetProject = useCallback((projects: Project[]) => {
        setProjects(projects);
        console.log("Projects:: ", projects);
    }, []);

    useEffect(() => {
        if (effectRan.current === true) {
            getProjects();
            electronAPI.receive("getProjects", handleGetProject);
        }
        return () => {
            effectRan.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCreateProject = useCallback(() => {
        setDailogState(false);
        electronAPI.getProjects();
    }, []);

    return (
        <div className="h-full p-5 flex flex-col bg-gray-50 border-r-[0.2px]">
            <SearchInput />
            <ScrollArea.Root className="flex-1 overflow-hidden">
                <ScrollArea.Viewport className="h-full w-full">
                    <ul className="list-none flex flex-col gap-3">
                        {projects.map((project: Project) => (
                            <li
                                key={project._id}
                                className="p-2 rounded-md hover:bg-gray-200 transition cursor-pointer"
                            >
                                {project.title}
                            </li>
                        ))}
                    </ul>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                    orientation="vertical"
                    className="flex w-[12px]"
                >
                    <ScrollArea.Thumb className="bg-gray-300 transition-background ease-out duration-500 flex-1 rounded-md" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
            <div className="w-full text-center">
                <Dialog.Root open={dialogState} onOpenChange={setDailogState}>
                    <Dialog.Trigger asChild>
                        <Button
                            size={"3"}
                            className="cursor-pointer bg-indigo-700 hover:bg-indigo-500 transition-background duration-700"
                        >
                            Create Project
                        </Button>
                    </Dialog.Trigger>
                    <Dialog.Overlay
                        className="fixed backdrop-blur-sm transition-all duration-900 ease-linear z-50"
                        style={{ inset: 0 }}
                    />
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-4 z-50 rounded-md w-[500px] max-w-full">
                        <Dialog.Title className="text-2xl text-left mb-2">
                            Crate Project
                        </Dialog.Title>
                        <CreateProjectForm onCreate={onCreateProject} />
                    </Dialog.Content>
                </Dialog.Root>
            </div>
        </div>
    );
};

export default LeftDrawer;
