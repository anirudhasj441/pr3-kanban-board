import React, { useCallback, useEffect, useState, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import theme from "./theme";
import "./style.css";
import {
    // $createParagraphNode,
    // $createTextNode,
    $getRoot,
    EditorState,
    LexicalEditor,
    LexicalNode,
    SerializedEditorState,
} from "lexical";
import Space from "../Space";
import { Task } from "../../../types";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import EditorNodes from "./EdiorNodes";

// import editor plugins
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import MyOnChangePlugin from "./plugins/MyOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import {
    $convertFromMarkdownString,
    // $convertToMarkdownString,
} from "@lexical/markdown";
import { EDITOR_TRANSFORMERS } from "./Markdowntransformers";
import { editorStateStore } from "../../stores";
import { EditorMode } from "./types";
// import MyContentEditable from "./MyContentEditable";

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
    const isDev =
        !process.env.NODE_ENV || process.env.NODE_ENV === "development";

    const effectRan = useRef(false);
    const editorRef = useRef<LexicalEditor | null>(null);

    const [editorState, setEditorState] = useState<EditorState>();
    const [mounted, setMounted] = useState<boolean>(false);
    const [editorMode, setEditorMode] = useState<EditorMode>("edit");

    const { setEditorValue, getEditorValue } = editorStateStore();

    const onChange = useCallback((editorState: EditorState) => {
        setEditorState(editorState);
    }, []);

    const onSave = useCallback(
        (editorState: EditorState | undefined) => {
            props.onSave(editorState);
            // props.onClose();
        },
        [props]
    );

    useEffect(() => {
        if (effectRan.current === true || !isDev) {
            setMounted(true);
            editorRef.current?.setEditable(false);
            if (props.task.desc === "") return;
            const taskDesc: SerializedEditorState = JSON.parse(props.task.desc);
            if (editorRef.current) {
                const editor_state =
                    editorRef.current.parseEditorState(taskDesc);
                editorRef.current.setEditorState(editor_state);
                setEditorState(editor_state);
                if (!props.editMode) convertMarkdownToNodes();
            }
        }
        return () => {
            effectRan.current = true;
        };
    }, []);

    useEffect(() => {
        if (effectRan.current || !isDev) {
            if (!mounted) return;
            editorRef.current?.setEditable(props.editMode);
            if (props.task.desc === "") return;
            console.log("editMode Change");
            setEditorMode(props.editMode ? "edit" : "preview");
            const taskDesc: SerializedEditorState = JSON.parse(props.task.desc);
            if (editorRef.current) {
                const editor_state =
                    editorRef.current.parseEditorState(taskDesc);
                editorRef.current.setEditorState(editor_state);
                setEditorState(editor_state);
                if (!props.editMode) {
                    convertMarkdownToNodes();
                    return;
                }
                convertNodeToMarkdown();
            }
        }
        return () => {
            effectRan.current = true;
        };
    }, [props.editMode]);

    const onError = (error: unknown) => {
        console.error("Editor error: ", error);
    };
    const initialConfig = {
        namespace: "myEditor",
        theme,
        nodes: [...EditorNodes],
        onError,
    };

    const convertMarkdownToNodes = () => {
        editorRef.current?.update(() => {
            const root = $getRoot();
            const nodes = root.getChildren();
            const editor_state: EditorState | undefined =
                editorRef.current?.getEditorState();
            const editorValue: SerializedEditorState | undefined =
                editor_state?.toJSON();
            console.log("HERE!!!", editor_state);
            if (!editorValue) return;

            setEditorValue(editorValue);
            const markdownList = nodes.map((node: LexicalNode) => {
                const nodeText = node.getTextContent();
                console.log(
                    "node: ",
                    nodeText,
                    ": ",
                    node.getTextContentSize()
                );
                return nodeText.trim().length > 0 ? nodeText : "\n";
            });
            const markdown = markdownList.join("\n");
            console.log("markdown: ", markdown);
            $convertFromMarkdownString(markdown, EDITOR_TRANSFORMERS);
        });
    };

    const convertNodeToMarkdown = () => {
        const editorValue: SerializedEditorState | undefined = getEditorValue();
        if (!editorValue) return;
        const editor_state = editorRef.current?.parseEditorState(editorValue);
        if (!editor_state) return;
        editorRef.current?.setEditorState(editor_state);
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            {props.editMode ? (
                <ToolbarPlugin onTogglePreview={setEditorMode} />
            ) : null}
            <div className="relative flex-1 flex flex-col">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="flex-1 w-full p-3 bottom-0 focus-visible:outline-none text-slate-600 rounded-md shadow-md bg-white h-full" />
                    }
                    placeholder={
                        <div
                            className="absolute top-3 left-3 text-slate-500 cursor-text"
                            onClick={() => editorRef.current?.focus()}
                        >
                            Write a description of task here...
                        </div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                {props.editMode ? (
                    <div className="flex pt-2 gap-1">
                        <Space />
                        <button
                            className="px-2 py-1 rounded-md bg-indigo-700 text-white hover:bg-indigo-500 disabled:bg-indigo-400"
                            onClick={() => onSave(editorState)}
                            disabled={editorMode === "preview"}
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
            </div>
            <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <LinkPlugin />
            <MyOnChangePlugin onChange={onChange} />

            <RefPlugin editorRef={editorRef} />
        </LexicalComposer>
    );
};

export default Editor;
