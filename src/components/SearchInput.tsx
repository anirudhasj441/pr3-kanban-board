import React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const SearchInput: React.FC = () => {
    return (
        <div className="seerch-container group mb-3 rounded-md border-none outline focus-within:outline-blue-500 outline-1 relative flex gap-0 items-center pe-2">
            <label
                htmlFor="search-input"
                className="absolute px-2 ease-in-out duration-500 group-focus-within:text-blue-500 top-1/2 -translate-y-1/2 group-focus-within:-top-0 group-focus-within:translate-y-0 transition-all group-focus-within:text-[10px]"
            >
                Search Project
            </label>
            <input
                type="text"
                id="search-input"
                className="p-2 w-full border-none outline-none flex-1 bg-transparent"
            />
            <MagnifyingGlassIcon
                height="30"
                width={30}
                className="group-focus-within:text-blue-500"
            />
        </div>
    );
};

export default SearchInput;
