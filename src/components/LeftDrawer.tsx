import React, { useCallback, useRef } from "react";
import { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import CreateProjectForm from "./CreateProjectForm";
import { Button } from "@radix-ui/themes";
import { Project } from "../../types";
import * as Dialog from "@radix-ui/react-dialog";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MyScrollArea from "./ScrollArea";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

const LeftDrawer: React.FC = () => {
    const effectRan = useRef(false);

    const [dialogState, setDailogState] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    // const [seacrhQuery, setSearchQuery] = useState<string>("");
    const location = useLocation();
    const navigate = useNavigate();

    const isDev =
        !process.env.NODE_ENV || process.env.NODE_ENV === "development";

    const getProjects = useCallback(() => {
        if (typeof window !== "undefined") electronAPI.getProjects();
    }, []);

    const handleGetProject = useCallback((projects: Project[]) => {
        setProjects(projects);
    }, []);

    const handleDeleteProject = useCallback(
        (projectId: string) => {
            electronAPI.deleteProject(projectId);
            const currentProjectId: string = location.pathname.split("/")[1];

            if (projectId === currentProjectId) {
                navigate("/");
            }

            getProjects();
        },
        [getProjects, location, navigate]
    );

    const handleSearchInputChange = useCallback(
        (value: string) => {
            if ("" === value) {
                getProjects();
                return;
            }

            const filterProjects = [...projects].filter((project: Project) =>
                project.title.toLowerCase().includes(value.toLowerCase())
            );

            setProjects(filterProjects);
        },
        [getProjects, projects]
    );

    useEffect(() => {
        if (effectRan.current === true || !isDev) {
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
        <div className="h-full py-5 flex flex-col bg-gray-50 border-r-[0.2px] shadow-2xl">
            <div className="px-5">
                <SearchInput
                    onChange={handleSearchInputChange}
                    onReset={getProjects}
                />
            </div>
            <MyScrollArea className="px-5 py-3">
                <ul className="list-none flex flex-col gap-3">
                    {effectRan.current}
                    {projects.map((project: Project) => (
                        <li
                            key={project._id}
                            className="p-2 rounded-md hover:bg-gray-200 transition cursor-pointer has-[.active-link]:bg-indigo-100 group/project"
                        >
                            <div className="flex items-center">
                                <NavLink
                                    to={"/" + project._id}
                                    className={({ isActive, isPending }) =>
                                        [
                                            isActive
                                                ? "text-indigo-700 active-link"
                                                : isPending
                                                ? "text-gray-800"
                                                : "",
                                            // "block p-2 rounded-md hover:bg-gray-200 transition cursor-pointer group/project",
                                            "block flex-1",
                                        ].join(" ")
                                    }
                                >
                                    {project.title}
                                </NavLink>
                                {/* <Space /> */}
                                <button
                                    className="p-1 group/btn invisible group-hover/project:visible hover:bg-indigo-300 hover:text-indigo-700 rounded-md"
                                    onClick={() =>
                                        handleDeleteProject(project._id)
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
                        </li>
                    ))}
                </ul>
            </MyScrollArea>
            {/* <div className="flex-grow overflow-hidden">
            </div> */}
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
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-4 z-50 rounded-md w-[350px] max-w-full shadow-lg">
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
