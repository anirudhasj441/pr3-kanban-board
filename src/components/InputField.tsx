import React, { KeyboardEventHandler } from "react";
import { useState, useRef } from "react";

interface InputFieldProp {
    id: string;
    label: string;
    autoFocus?: boolean | undefined;
    value?: string;
    onValueChange: (value: string) => void;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
}

const InputField: React.FC<InputFieldProp> = (props) => {
    const [value, setValue] = useState(props.value);
    const input: React.MutableRefObject<null> = useRef(null);
    const valueChanged = () => {
        const inputElm: HTMLInputElement = document.getElementById(
            props.id
        ) as HTMLInputElement;
        const inputValue = inputElm.value;
        setValue(inputValue);
        props.onValueChange(inputValue);
    };

    return (
        <div
            className="
                seerch-container
                group

                rounded-md
                border-none

                transition-all
                duration-800
                ease-in-out
                outline
                outline-slate-500
                has-[input:focus]:outline-indigo-700
                has-[input:focus]:outline-2
                outline-1

                relative

                flex
                gap-0
                items-center

                pe-2
            "
        >
            <input
                type="text"
                id={props.id}
                ref={input}
                autoFocus={props.autoFocus}
                className="
                    peer
                    px-2
                    py-3
                    w-full
                    border-none
                    outline-none
                    flex-1
                    bg-transparent
                    placeholder:text-transparent
                    z-10
                "
                value={value}
                onChange={valueChanged}
                placeholder="seacrh"
                onKeyDown={props.onKeyDown ? props.onKeyDown : undefined}
            />
            <label
                htmlFor="search-input"
                className="
                    absolute
                    px-2
                    ease-in-out
                    duration-500
                    transition-all
                    z-9

                    top-2
                    left-0
                    text-[12px]
                    text-slate-500
                    -translate-y-1/2
                    bg-transperant

                    peer-focus:top-2
                    peer-focus:left-0
                    peer-focus:text-[12px]
                    peer-focus:text-indigo-700
                    peer-focus:bg-transperant

                    peer-placeholder-shown:top-1/2
                    peer-placeholder-shown:left-0
                    peer-placeholder-shown:text-slate-500
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:bg-transparent
                "
            >
                {props.label}
            </label>
        </div>
    );
};

InputField.defaultProps = {
    autoFocus: false,
    value: "",
};

export default InputField;
