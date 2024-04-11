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
    const [mounted, setMounted] = useState<boolean>(false);
    const onError = (error: unknown) => {
        console.error("Editor error: ", error);
    };
    const editorRef = useRef<LexicalEditor | null>(null);

    const { setEditorValue, getEditorValue } = editorStateStore();
    const initialConfig = {
        namespace: "myEditor",
        theme,
        nodes: [...EditorNodes],
        onError,
    };

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

    const isDev =
        !process.env.NODE_ENV || process.env.NODE_ENV === "development";

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
            console.log("after editmode: ", props.editMode);
            editorRef.current?.setEditable(props.editMode);
            // if (!props.editMode) {
            //     console.log("Converting ,,,");
            //     console.log("Upadte editMode");
            //     convertMarkdownToNodes();
            // } else {
            //     convertNodeToMarkdown();
            // }
            if (props.task.desc === "") return;
            console.log("editMode Change");
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
            const markdown = markdownList.join("");
            console.log("markdown: ", markdown);
            $convertFromMarkdownString(markdown, EDITOR_TRANSFORMERS);
        });
    };

    const convertNodeToMarkdown = () => {
        // editorRef.current?.update(() => {
        //     const root = $getRoot();

        //     const markdown = $convertToMarkdownString(EDITOR_TRANSFORMERS);
        //     const textNode = $createParagraphNode().append(
        //         $createTextNode(markdown)
        //     );
        //     root.clear().append(textNode);
        // });
        const editorValue: SerializedEditorState | undefined = getEditorValue();
        if (!editorValue) return;
        const editor_state = editorRef.current?.parseEditorState(editorValue);
        if (!editor_state) return;
        editorRef.current?.setEditorState(editor_state);
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            {props.editMode ? <ToolbarPlugin /> : <></>}
            <div className="relative">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="w-full p-3 bottom-0 focus-visible:outline-none text-slate-600 rounded-md shadow-md bg-white" />
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
            </div>
            <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <LinkPlugin />
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
