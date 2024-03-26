import React from "react";
import { alignmentButtons, formatButtons } from "../ToolbarButtons";
import Seperator from "../../Seperator";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND } from "lexical";
import Space from "../../Space";

const ToolbarPlugin: React.FC = () => {
    const [editor] = useLexicalComposerContext();

    return (
        <div className="flex bg-white px-3 py-1 mb-2 rounded-md shadow-md">
            {formatButtons.map((btn) => (
                <button
                    key={btn.id}
                    className="p-2 hover:bg-gray-200 rounded-md"
                    onClick={() =>
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, btn.command)
                    }
                >
                    {btn.icon}
                </button>
            ))}
            <Seperator dir="vertical" />
            <Space />
            {alignmentButtons.map((btn) => (
                <button
                    key={btn.id}
                    className="p-2 hover:bg-gray-200 rounded-md"
                    onClick={() =>
                        editor.dispatchCommand(
                            FORMAT_ELEMENT_COMMAND,
                            btn.command
                        )
                    }
                >
                    {btn.icon}
                </button>
            ))}
        </div>
    );
};

export default ToolbarPlugin;
