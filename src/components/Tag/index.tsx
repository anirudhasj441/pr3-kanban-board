import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import React from "react";
import { TagColor } from "../../../types";

interface TagProps {
    label: string;
    color: TagColor;
    showRemoveBtn?: boolean;
    onRemove?: () => void;
}

const TagBadge: React.FC<TagProps> = (props: TagProps) => {
    props.label;
    return (
        <div
            className="tag rounded-full px-2 py-1 flex gap-1 items-center text-white font-bold w-max"
            style={{ backgroundColor: props.color }}
        >
            <div className="text-xs">{props.label}</div>
            {props.showRemoveBtn ? (
                <button onClick={props.onRemove}>
                    <Icon
                        icon="material-symbols:close"
                        width={15}
                        height={15}
                        className="block"
                    />
                </button>
            ) : null}
        </div>
    );
};

TagBadge.defaultProps = {
    showRemoveBtn: false,
};

export default TagBadge;
