import React, { useCallback, useState } from "react";
import { Task } from "../../types";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Space from "./Space";
import Editor from "./Editor";
import { EditorState } from "lexical";

interface TaskDetailProps {
    task: Task;
    onUpdateDesc?: (editorState: EditorState | undefined) => void;
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
        <div className="pt-3 h-full flex flex-col">
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
            <div className="flex-grow">
                <Editor
                    id={props.task._id}
                    task={props.task}
                    onClose={() => setEditMode(false)}
                    onSave={(editorState) => onSave(editorState)}
                    editMode={editMode}
                />
            </div>
        </div>
    );
};

export default TaskDetail;
