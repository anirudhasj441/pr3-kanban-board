import React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const SearchInput: React.FC = () => {
    return (
        <div
            className="
            seerch-container
            mb-3
            group

            rounded-md
            border-none

            outline
            outline-slate-500
            has-[input:focus]:outline-blue-500
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
                    bg-t
                    ransparent
                    placeholder:text-transparent
                "
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
                    bg-white
                    z-9

                    top-0
                    left-2
                    text-[12px]
                    text-slate-500
                    -translate-y-1/2

                    peer-focus:top-0
                    peer-focus:left-2
                    peer-focus:text-[12px]
                    peer-focus:text-blue-500

                    peer-placeholder-shown:top-1/2
                    peer-placeholder-shown:left-0
                    peer-placeholder-shown:text-slate-500
                    peer-placeholder-shown:text-base
                "
            >
                Search Project
            </label>
            <MagnifyingGlassIcon
                height="30"
                width={30}
                className="peer-focus:text-blue-500 text-slate-500"
            />
        </div>
    );
};

export default SearchInput;
