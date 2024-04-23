import React, { useCallback, useState } from "react";
import { Task } from "../../types";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Space from "./Space";
import Editor from "./Editor";
import { EditorState } from "lexical";
import MySlider from "./Slider";
import Seperator from "./Seperator";
// import Tag from "./Tag";

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
            <div className="h-full rounded-md w-[40%] p-3">
                <div className="pb-5">
                    <MySlider
                        label="PROGRESS"
                        value={[!props.task.progress ? 0 : props.task.progress]}
                        onChange={props.onUpdateProgress}
                    />
                </div>
                <Seperator className="my-3" />
                <div className="">
                    <div className="text-slate-600">TAGS</div>
                    <div className="flex gap-2 items-center flex-wrap">
                        <button className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full flex gap-1 items-center hover:bg-gray-500 active:bg-gray-700">
                            <Icon
                                icon="material-symbols:add"
                                className="block"
                                width={15}
                                height={15}
                            />
                            <div className="">Add tag</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
