import React, { useCallback, useState } from "react";
// import { formatButtons } from "../ToolbarButtons";
// import Seperator from "../../Seperator";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorMode } from "../types";
// import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import {
    // $createParagraphNode,
    // $createTextNode,
    $getRoot,
    EditorState,
    LexicalNode,
    SerializedEditorState,
} from "lexical";
import { EDITOR_TRANSFORMERS } from "../Markdowntransformers";
import {
    $convertFromMarkdownString,
    // $convertToMarkdownString,
} from "@lexical/markdown";

import { editorStateStore } from "../../../stores";

interface ToolbarPluginProps {
    onTogglePreview?: (mode: EditorMode) => void;
}

const ToolbarPlugin: React.FC<ToolbarPluginProps> = (
    props: ToolbarPluginProps
) => {
    const [editor] = useLexicalComposerContext();
    const [editorMode, setEditorMode] = useState<EditorMode>("edit");

    const { getEditorValue, setEditorValue } = editorStateStore();

    const handleToggleEditorMode = useCallback(
        (value: EditorMode) => {
            if (value === "preview") {
                editor.update(() => {
                    const root = $getRoot();
                    const nodes = root.getChildren();
                    if (!nodes) return;
                    const editorState = editor.getEditorState();
                    const editorValue: SerializedEditorState =
                        editorState.toJSON();
                    setEditorValue(editorValue);
                    console.log("NODES: ", nodes);
                    const markdownList = nodes.map((node: LexicalNode) =>
                        node.getTextContent().trim().length > 0
                            ? node.getTextContent()
                            : "\n"
                    );
                    const markdown = markdownList.join("\n");
                    $convertFromMarkdownString(markdown, EDITOR_TRANSFORMERS);
                    editor.setEditable(false);
                });
            } else {
                const editorValue: SerializedEditorState | undefined =
                    getEditorValue();
                console.log("nodes: ", editorValue);
                if (!editorValue) return;
                const editor_state: EditorState =
                    editor.parseEditorState(editorValue);
                editor.setEditorState(editor_state);
                editor.setEditable(true);
            }
            setEditorMode(value);
            if (props.onTogglePreview) props.onTogglePreview(value);
        },
        [editor, getEditorValue, setEditorValue, props]
    );

    // const handleBoldBtn = useCallback(() => {
    //     editor.update(() => {});
    // }, [editor]);

    return (
        <div className="flex bg-white px-3 py-1 mb-2 rounded-md shadow-md items-center">
            <button
                className="p-1 hover:bg-gray-200 rounded-md text-slate-600 active:bg-gray-300"
                onClick={() =>
                    handleToggleEditorMode(
                        editorMode === "edit" ? "preview" : "edit"
                    )
                }
            >
                {editorMode === "edit" ? "Preview" : "Continue Editing"}
            </button>
            {editorMode === "edit" ? (
                <>
                    {/* {formatButtons.map((btn) => (
                        <button
                            key={btn.id}
                            className="p-1 hover:bg-gray-200 rounded-md"
                        >
                            {btn.icon}
                        </button>
                    ))} */}
                </>
            ) : null}
        </div>
    );
};

export default ToolbarPlugin;
