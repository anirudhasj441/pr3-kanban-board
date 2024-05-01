import React, { useState } from "react";
import InputField from "../../InputField";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

const CreateTagForm: React.FC = () => {
    const [label, setLabel] = useState<string>("");
    return (
        <div className="label-form mt-2">
            <InputField
                id="tag-label"
                value={label}
                label="Add tag"
                onValueChange={setLabel}
                icon={
                    <Icon
                        icon={"mdi:tag"}
                        className="block"
                        width={25}
                        height={25}
                    ></Icon>
                }
            />
        </div>
    );
};

export default CreateTagForm;
