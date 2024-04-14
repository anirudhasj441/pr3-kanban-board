import React, { useCallback, useState } from "react";
import { Task } from "../../types";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Space from "./Space";
import Editor from "./Editor";
import { EditorState } from "lexical";
import MySlider from "./Slider";
// import Seperator from "./Seperator";

interface TaskDetailProps {
    task: Task;
    onUpdateDesc?: (editorState: EditorState | undefined) => void;
    onUpdateProgress?: (value: number) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = (props: TaskDetailProps) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const onSave = useCallback(
        (editorState: EditorState | undefined) => {
            props.onUpdateDesc && props.onUpdateDesc(editorState);
            setTimeout(() => {
                setEditMode(false);
            }, 1);
        },
        [props]
    );

    return (
        <div className="pt-3 h-full flex gap-4 w-full">
            <div className="h-full flex  flex-col w-[60%]">
                <div className="flex mb-2">
                    <Space />
                    <button
                        className={[
                            "p-2 hover:bg-gray-200 rounded-md",
                            editMode ? "bg-indigo-200" : "",
                        ].join(" ")}
                        onClick={() => setEditMode(!editMode)}
                    >
                        <Icon
                            icon="material-symbols:edit"
                            height={20}
                            width={20}
                            className={[
                                "block",
                                editMode ? "text-indigo-700" : "",
                            ].join(" ")}
                        />
                    </button>
                </div>
                <div className="flex-grow flex flex-col">
                    <Editor
                        id={props.task._id}
                        task={props.task}
                        onClose={() => setEditMode(false)}
                        onSave={(editorState) => onSave(editorState)}
                        editMode={editMode}
                    />
                </div>
            </div>
            <div className="h-full rounded-md flex-grow p-3">
                <div className="pb-5">
                    <MySlider
                        label="PROGRESS"
                        value={[!props.task.progress ? 0 : props.task.progress]}
                        onChange={props.onUpdateProgress}
                    />
                </div>
                {/* <Seperator className="my-2" /> */}
            </div>
        </div>
    );
};

export default TaskDetail;
