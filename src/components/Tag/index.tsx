import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import React from "react";
import { TagColor } from "../../../types";

interface TagProps {
    label: string;
    color: TagColor;
}

const Tag: React.FC<TagProps> = (props: TagProps) => {
    props.label;
    return (
        <div
            className="tag rounded-full px-2 py-1 flex gap-1 items-center text-white font-bold"
            style={{ backgroundColor: props.color }}
        >
            <div className="text-xs">{props.label}</div>
            <button>
                <Icon
                    icon="material-symbols:close"
                    width={15}
                    height={15}
                    className="block"
                />
            </button>
        </div>
    );
};

export default Tag;
