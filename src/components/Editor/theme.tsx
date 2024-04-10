import { EditorThemeClasses } from "lexical";

const theme: EditorThemeClasses = {
    text: {
        bold: "font-semibold",
        underline: "underline",
        italic: "italic",
        strikethrough: "line-through",
        // underlineStrikethrough: "underlined-line-through",
    },
    heading: {
        h1: "text-5xl",
        h2: "text-4xl",
        h3: "text-3xl",
        h4: "text-2xl",
        h5: "text-xl",
        h6: "text-md",
    },
    list: {
        nested: {
            listitem: "ml-4",
        },
        ol: "ml-4 list-decimal",
        ul: "ml-4 list-disc",
    },
};

export default theme;
