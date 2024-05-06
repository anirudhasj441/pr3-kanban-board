import React, { useCallback, useContext, useState } from "react";
import InputField from "../../InputField";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { TagColor } from "../../../../types";
import Seperator from "../../Seperator";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { ProjectContext } from "../../../pages/ProjectPage";

interface CreateTagFormProps {
    ovLabelChange?: (label: string) => void;
    createTagMode?: boolean;
}

const colors: TagColor[] = [
    "Fuchsia",
    "blue",
    "cyan",
    "gray",
    "green",
    "indigo",
    "lime",
    "orange",
    "pink",
    "purple",
    "red",
    // "rose",
    // "sky",
    // "slate",
    // "stone",
    "teal",
    "violet",
    "yellow",
    "zinc",
];

const CreateTagForm: React.FC<CreateTagFormProps> = (
    props: CreateTagFormProps
) => {
    //context values
    const projectId = useContext(ProjectContext);

    // states
    const [label, setLabel] = useState<string>("");
    const [tagColor, setTagColor] = useState<string>("");

    // callbacks
    const handleValueChange = useCallback(
        (value: string) => {
            setLabel(value);
            if (props.ovLabelChange) props.ovLabelChange(value);
        },
        [props]
    );

    const handleCrateTag = useCallback(() => {
        console.log("label: ", label, "color", tagColor);
        if (label === "" || tagColor === "" || !projectId) return;
        electronAPI.createTag(projectId, label, tagColor);
    }, [label, tagColor, projectId]);

    return (
        <div className="label-form mt-2">
            <InputField
                id="tag-label"
                value={label}
                label="Add tag"
                onValueChange={handleValueChange}
                icon={
                    <Icon
                        icon={"mdi:tag"}
                        className="block"
                        width={25}
                        height={25}
                    ></Icon>
                }
            />
            <Seperator className="mt-3" />
            {props.createTagMode ? (
                <div className="flex flex-col gap-2">
                    <RadioGroup.Root
                        value={tagColor}
                        onValueChange={setTagColor}
                        className="color-selector gap-2 flex flex-wrap mt-2"
                    >
                        {colors.map((color) => (
                            // <button
                            //     key={color}
                            //     className="rounded-full w-5 h-5"
                            //     style={{ backgroundColor: color }}
                            // ></button>
                            <RadioGroup.Item
                                key={color}
                                value={color}
                                className="h-5 w-5 rounded-full flex items-center justify-center cursor-pointer"
                                style={{ backgroundColor: color }}
                            >
                                <RadioGroup.Indicator className="block w-[70%] h-[70%] rounded-full bg-gray-100" />
                            </RadioGroup.Item>
                        ))}
                    </RadioGroup.Root>

                    <button
                        onClick={handleCrateTag}
                        className="
                                    text-sm
                                    text-slate-600
                                    opacity-0
                                    bg-gray-100
                                    hover:bg-gray-300
                                    group-hover:opacity-100
                                    px-2 py-2 w-max
                                    rounded-md
                                    transition-opacity
                                    duration-500
                                    flex
                                    gap-1
                                    items-center
                                    active:bg-gray-400
                                "
                    >
                        <Icon icon="material-symbols:add" className="block" />
                        <div>Create New Tag</div>
                    </button>
                </div>
            ) : null}
        </div>
    );
};

CreateTagForm.defaultProps = {
    createTagMode: false,
};

export default CreateTagForm;
