import React, { useCallback, useEffect, useState, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import MyOnChangePlugin from "./plugins/MyOnChangePlugin";
import theme from "./theme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import "./style.css";
import { EditorState, LexicalEditor, SerializedEditorState } from "lexical";
import Space from "../Space";
import { Task } from "../../../types";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

interface EditorProps {
    id: string;
    task: Task;
    onClose: () => void;
    onSave: (editorState: EditorState | undefined) => void;
    editMode: boolean;
}

interface RefPluginProps {
    editorRef: React.MutableRefObject<LexicalEditor | null>;
}

const RefPlugin: React.FC<RefPluginProps> = (props: RefPluginProps) => {
    const [editor] = useLexicalComposerContext();

    props.editorRef.current = editor;

    return null;
};

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
    const effectRan = useRef(false);
    const [editorState, setEditorState] = useState<EditorState>();
    const onError = (error: unknown) => {
        console.error("Editor error: ", error);
    };
    const editorRef = useRef<LexicalEditor | null>(null);
    const initialConfig = {
        namespace: "myEditor",
        theme,
        onError,
    };

    const onChange = useCallback((editorState: EditorState) => {
        setEditorState(editorState);
    }, []);

    const onSave = useCallback(
        (editorState: EditorState | undefined) => {
            props.onSave(editorState);
            props.onClose();
        },
        [props]
    );

    const isDev =
        !process.env.NODE_ENV || process.env.NODE_ENV === "development";

    useEffect(() => {
        if (effectRan.current === true || !isDev) {
            if (props.task.desc === "") return;
            const taskDesc: SerializedEditorState = JSON.parse(props.task.desc);
            if (editorRef.current) {
                const editor_state =
                    editorRef.current.parseEditorState(taskDesc);
                // setEditorState(editor_state);
                editorRef.current.setEditorState(editor_state);
            }
        }
        return () => {
            effectRan.current = true;
        };
    }, [props, setEditorState, isDev]);

    useEffect(() => {
        editorRef.current?.setEditable(props.editMode);
    }, [props.editMode]);

    return (
        <LexicalComposer initialConfig={initialConfig}>
            {props.editMode ? <ToolbarPlugin /> : <></>}
            <div className="relative">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="w-full p-3 bottom-0 focus-visible:outline-none text-slate-600 rounded-md shadow-md bg-white" />
                    }
                    placeholder={
                        <div className="absolute top-3 left-3 text-slate-600">
                            Description not available!
                        </div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
            </div>
            <HistoryPlugin />
            <AutoFocusPlugin />
            <MyOnChangePlugin onChange={onChange} />
            {props.editMode ? (
                <div className="flex pt-2 gap-1">
                    <Space />
                    <button
                        className="px-2 py-1 rounded-md bg-indigo-700 text-white hover:bg-indigo-500"
                        onClick={() => onSave(editorState)}
                    >
                        Save
                    </button>
                    <button
                        className="px-2 py-1 rounded-md hover:bg-gray-300"
                        onClick={props.onClose}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <></>
            )}
            <RefPlugin editorRef={editorRef} />
        </LexicalComposer>
    );
};

export default Editor;
