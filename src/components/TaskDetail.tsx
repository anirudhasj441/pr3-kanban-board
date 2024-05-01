import React, { useCallback, useState } from "react";
import { Task } from "../../types";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Space from "./Space";
import Editor from "./Editor";
import { EditorState } from "lexical";
import MySlider from "./Slider";
import Seperator from "./Seperator";
import * as Dialog from "@radix-ui/react-dialog";
import CreateTagForm from "./Tag/CreateTagForm";

interface TaskDetailProps {
    task: Task;
    onUpdateDesc?: (editorState: EditorState | undefined) => void;
    onUpdateProgress?: (value: number) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = (props: TaskDetailProps) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [createTagForm, setCreateTagForm] = useState<boolean>(false);
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
                        <Dialog.Root
                            open={createTagForm}
                            onOpenChange={setCreateTagForm}
                        >
                            <Dialog.Trigger asChild>
                                <button className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full flex gap-1 items-center hover:bg-gray-500 active:bg-gray-700">
                                    <Icon
                                        icon="material-symbols:add"
                                        className="block"
                                        width={15}
                                        height={15}
                                    />
                                    <div className="">Add tag</div>
                                </button>
                            </Dialog.Trigger>
                            <Dialog.Overlay
                                className="fixed backdrop-blur-sm transition-all duration-900 ease-linear z-10"
                                style={{ inset: 0 }}
                            />
                            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 z-20 rounded-md w-[300px] shadow-lg cursor-auto flex flex-col">
                                <div className="h-full flex flex-col p-4">
                                    {/* <Dialog.Title className="flex">
                                        <div className="text-2xl text-slate-600">
                                            Add tag
                                        </div>
                                        <Space></Space>

                                        <button
                                            className="hover:bg-gray-300 p-1 rounded-md transition duration-800 ease-in-out"
                                            onClick={() =>
                                                setCreateTagForm(false)
                                            }
                                        >
                                            <Icon
                                                icon="material-symbols:close"
                                                width={25}
                                                height={25}
                                                className="block text-slate-600"
                                            />
                                        </button>
                                    </Dialog.Title> */}
                                    {/* <Seperator /> */}
                                    <CreateTagForm />
                                    <Seperator className="mt-3" />
                                    <ul className="tag-list py-2">
                                        <li className="flex gap-1 hover:bg-gray-300 p-2 active:bg-gray-400 rounded-md">
                                            <Icon
                                                icon="material-symbols:circle"
                                                className="block"
                                                width={25}
                                                height={25}
                                                style={{
                                                    color: "red",
                                                }}
                                            />
                                            <div className="text-md">bug</div>
                                        </li>
                                    </ul>
                                </div>
                            </Dialog.Content>
                        </Dialog.Root>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
