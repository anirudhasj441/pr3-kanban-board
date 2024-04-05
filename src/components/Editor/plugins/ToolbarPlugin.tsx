import React, { useCallback, useState } from "react";
// import { formatButtons } from "../ToolbarButtons";
import Seperator from "../../Seperator";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorMode } from "../types";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import { EDITOR_TRANSFORMERS } from "../Markdowntransformers";
import {
    $convertFromMarkdownString,
    $convertToMarkdownString,
} from "@lexical/markdown";

const ToolbarPlugin: React.FC = () => {
    const [editor] = useLexicalComposerContext();
    const [editorMode, setEditorMode] = useState<EditorMode>("edit");

    const handleToggleEditorMode = useCallback(
        (value: EditorMode) => {
            // TODO: add logic to toggle edit mode(show markdowm to richtext on preview)
            console.log("Before EditMode: ", value);
            editor.update(() => {
                const root = $getRoot();
                const firstChild = root.getFirstChild();
                if (value === "preview") {
                    if (!firstChild) return;
                    $convertFromMarkdownString(
                        firstChild?.getTextContent(),
                        EDITOR_TRANSFORMERS
                    );
                    editor.setEditable(false);
                } else {
                    const markdown =
                        $convertToMarkdownString(EDITOR_TRANSFORMERS);
                    const textNode = $createParagraphNode().append(
                        $createTextNode(markdown)
                    );
                    root.clear().append(textNode);
                    editor.setEditable(true);
                }
                root.selectEnd();
                setEditorMode(value);
            });
        },
        [editor, editorMode]
    );

    const handleBoldBtn = useCallback(() => {
        editor.update(() => {});
    }, [editor]);

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
                    <Seperator
                        dir="vertical"
                        className="py-2 bg-slate-400 mx-2"
                    />
                    {/* {formatButtons.map((btn) => (
                        <button
                            key={btn.id}
                            className="p-1 hover:bg-gray-200 rounded-md"
                        >
                            {btn.icon}
                        </button>
                    ))} */}
                    <button
                        className="p-1 hover:bg-gray-200 rounded-md"
                        onClick={handleBoldBtn}
                    >
                        <Icon
                            icon="octicon:bold-24"
                            height={20}
                            width={20}
                            className="block text-slate-600"
                        />
                    </button>
                    <Seperator
                        dir="vertical"
                        className="py-2 bg-slate-400 mx-2"
                    />
                </>
            ) : null}
        </div>
    );
};

export default ToolbarPlugin;
