// import * as Dialog from "@radix-ui/react-dialog";
import InputField from "./InputField";
import React from "react";
import { useState, useCallback } from "react";
import { Button } from "@radix-ui/themes";

interface CreateProjectFormProp {
    onCreate: (success: boolean) => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProp> = (props) => {
    const [title, setTitle] = useState("");

    const createProject = useCallback(() => {
        electronAPI.createProject(title);
        props.onCreate(true);
    }, [props, title]);

    return (
        <div className="flex flex-col">
            <InputField
                id="project-title"
                label="Project Title"
                onValueChange={(value) => setTitle(value)}
            />
            <div className="text-right">
                <Button
                    className="bg-indigo-700 hover:bg-indigo-500 active:bg-indigo-700 cursor-pointer"
                    size={"3"}
                    data-ripple-light="true"
                    onClick={createProject}
                >
                    Create
                </Button>
            </div>
        </div>
    );
};

export default CreateProjectForm;
