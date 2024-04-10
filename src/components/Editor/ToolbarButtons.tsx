import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { TextFormatButton, ElementFormatButton } from "../../../types";

export const formatButtons: TextFormatButton[] = [
    {
        id: 1,
        icon: (
            <Icon
                icon="octicon:bold-24"
                height={20}
                width={20}
                className="block text-slate-600"
            />
        ),
        command: "bold",
    },
    {
        id: 2,
        icon: (
            <Icon
                icon="octicon:italic"
                height={20}
                width={20}
                className="block text-slate-600"
            />
        ),
        command: "italic",
    },
    {
        id: 3,
        icon: (
            <Icon
                icon="mi:strikethrough"
                height={20}
                width={20}
                className="block text-slate-600"
            />
        ),
        command: "strikethrough",
    },
];

export const alignmentButtons: ElementFormatButton[] = [
    {
        id: 1,
        icon: (
            <Icon
                icon="ph:text-align-left-light"
                height={20}
                width={20}
                className="block text-slate-600"
            />
        ),
        command: "left",
    },
    {
        id: 2,
        icon: (
            <Icon
                icon="ph:text-align-center-light"
                height={20}
                width={20}
                className="block text-slate-600"
            />
        ),
        command: "center",
    },
    {
        id: 3,
        icon: (
            <Icon
                icon="ph:text-align-right-light"
                height={20}
                width={20}
                className="block text-slate-600"
            />
        ),
        command: "right",
    },
];
