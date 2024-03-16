import React, { useState } from "react";
import InputField from "./InputField";
// import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
// import Space from "./Space";

interface CreateTaskFormProps {
    onCreate: (taskTitle: string) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = (
    props: CreateTaskFormProps
) => {
    const [taskTitle, setTaskTitle] = useState("");

    return (
        <div className="rounded-md bg-white p-3 flex flex-col gap-3 shadow-md">
            <InputField
                id="task-input"
                label="Task"
                onValueChange={(value) => {
                    setTaskTitle(value);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        props.onCreate(taskTitle);
                    }
                }}
                autoFocus={true}
            />
            {/* <div className="flex">
                <Space />
                <button
                    className="hover:bg-indigo-100 group btn p-1 rounded-md"
                    onClick={() => props.onCreate(taskTitle)}
                >
                    <Icon
                        icon="material-symbols:add"
                        className="block text-slate-600 group-[.btn]:hover:text-indigo-700"
                        width={20}
                        height={20}
                    />
                </button>
            </div> */}
        </div>
    );
};

export default CreateTaskForm;
