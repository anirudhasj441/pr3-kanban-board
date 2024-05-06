import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Tag, Task } from "../../types";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Space from "./Space";
import Editor from "./Editor";
import { EditorState } from "lexical";
import MySlider from "./Slider";
import Seperator from "./Seperator";
import * as Dialog from "@radix-ui/react-dialog";
import CreateTagForm from "./Tag/CreateTagForm";
import { ProjectContext } from "../pages/ProjectPage";
import TagBadge from "./Tag";

interface TaskDetailProps {
    task: Task;
    onUpdateDesc?: (editorState: EditorState | undefined) => void;
    onUpdateProgress?: (value: number) => void;
}

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const TaskDetail: React.FC<TaskDetailProps> = (props: TaskDetailProps) => {
    // refs
    const effectRan = useRef<boolean>(false);

    // context Value
    const projectId: string | undefined = useContext(ProjectContext);

    // states
    const [editMode, setEditMode] = useState<boolean>(false);
    const [createTagForm, setCreateTagForm] = useState<boolean>(false);
    const [tags, setTags] = useState<Tag[]>([]);
    const [newTagFlag, setNewTagFlag] = useState<boolean>(false);

    // callbacks
    const onSave = useCallback(
        (editorState: EditorState | undefined) => {
            props.onUpdateDesc && props.onUpdateDesc(editorState);
            setTimeout(() => {
                setEditMode(false);
            }, 1);
        },
        [props]
    );

    const tagAttached = useCallback(
        (aTag: Tag): boolean => {
            const result = props.task.tags?.find(
                (tag: Tag) => tag._id == aTag._id
            );
            console.log(result, ": ", result !== undefined);
            return result !== undefined;
        },
        [props]
    );

    const onTagSelect = useCallback(
        (tag: Tag) => {
            if (!projectId) return;
            console.log("tag is attached: ", tagAttached(tag));
            if (!tagAttached(tag)) {
                console.log("Attaching...");
                electronAPI.attachTagToTask(projectId, props.task._id, tag);
            } else {
                console.log("Detaching...");
                electronAPI.detachTagFromTask(projectId, props.task._id, tag);
            }
        },
        [props, projectId, tagAttached]
    );

    /**
     * Slot for receive tags from Electron Process
     */
    const handleGetAllTags = useCallback((tags: Tag[]) => {
        console.log("fetching Tags!!!", tags);
        setTags(tags);
    }, []);

    /**
     * Slot for handle tag label change
     */
    const handleLabelChange = useCallback(
        (label: string) => {
            if ("" === label.trim()) {
                setNewTagFlag(false);
                if (projectId) electronAPI.getAllTags(projectId);
                return;
            }
            const filterTags: Tag[] = tags.filter((tag: Tag) =>
                tag.label.toLowerCase().includes(label.toLowerCase())
            );

            setTags(filterTags);
            setNewTagFlag(filterTags.length === 0);
        },
        [tags, setTags, projectId]
    );

    // useEffect
    useEffect(() => {
        if (effectRan.current || !isDev) {
            if (!projectId) return;
            electronAPI.getAllTags(projectId);
            electronAPI.receive("getAllTags", handleGetAllTags);
        }
        return () => {
            effectRan.current = true;
        };
    }, [handleGetAllTags, projectId]);

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
                                    <CreateTagForm
                                        ovLabelChange={handleLabelChange}
                                        createTagMode={newTagFlag}
                                    />
                                    {/* <Seperator className="mt-3" /> */}
                                    {tags.length > 0 ? (
                                        <ul className="tag-list py-2">
                                            {tags.map((tag: Tag) => (
                                                <li
                                                    key={tag._id}
                                                    onClick={() =>
                                                        onTagSelect(tag)
                                                    }
                                                    className="flex gap-1 hover:bg-gray-300 p-2 active:bg-gray-400 rounded-md"
                                                >
                                                    {tagAttached(tag) ? (
                                                        <Icon
                                                            icon="material-symbols:check-circle"
                                                            className="block"
                                                            width={25}
                                                            height={25}
                                                            style={{
                                                                color: tag.color,
                                                            }}
                                                        />
                                                    ) : (
                                                        <Icon
                                                            icon="material-symbols:circle"
                                                            className="block"
                                                            width={25}
                                                            height={25}
                                                            style={{
                                                                color: tag.color,
                                                            }}
                                                        />
                                                    )}
                                                    <div className="text-md">
                                                        {tag.label}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </div>
                            </Dialog.Content>
                        </Dialog.Root>
                        {props.task.tags.map((tag: Tag) => (
                            <TagBadge
                                key={tag._id}
                                label={tag.label}
                                color={tag.color}
                                showRemoveBtn
                                onRemove={() => onTagSelect(tag)}
                            ></TagBadge>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
