import React, { useCallback, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

interface SearchInputProps {
    onChange?: (value: string) => void;
    onReset?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
    const [value, setValue] = useState<string>("");

    const valueChanged = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue: string = event.target.value;

            setValue(inputValue);
            if (props.onChange) props.onChange(inputValue);
        },
        [props]
    );

    const valueReset = useCallback(() => {
        setValue("");
        if (props.onReset) props.onReset();
    }, [props]);

    return (
        <div
            className="
            seerch-container
            mb-3
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
                id="search-input"
                className="
                    peer
                    p-2
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

                    top-0
                    left-2
                    text-[12px]
                    text-slate-500
                    -translate-y-1/2
                    bg-gray-50

                    peer-focus:top-0
                    peer-focus:left-2
                    peer-focus:text-[12px]
                    peer-focus:text-indigo-700
                    peer-focus:bg-gray-50

                    peer-placeholder-shown:top-1/2
                    peer-placeholder-shown:left-0
                    peer-placeholder-shown:text-slate-500
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:bg-transparent
                "
            >
                Search Project
            </label>
            {value.length > 0 ? (
                <button
                    className="peer-focus:text-indigo-700 text-slate-500"
                    onClick={valueReset}
                >
                    <Icon
                        icon="material-symbols:close"
                        width={30}
                        height={30}
                        className="block"
                    />
                </button>
            ) : (
                <MagnifyingGlassIcon
                    height="30"
                    width={30}
                    className="peer-focus:text-indigo-700 text-slate-500"
                />
            )}
        </div>
    );
};

export default SearchInput;
