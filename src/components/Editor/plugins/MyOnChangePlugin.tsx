import React, { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";

interface MyOnChangePluginProps {
    onChange: (editorState: EditorState) => void;
}

const MyOnChangePlugin: React.FC<MyOnChangePluginProps> = (
    props: MyOnChangePluginProps
) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            props.onChange(editorState);
        });
    }, [props, editor]);

    return null;
};

export default MyOnChangePlugin;
