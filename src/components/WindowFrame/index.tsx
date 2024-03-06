/* global electronAPI */

import React from "react";
import "./style.scss";

import { Cross1Icon, MinusIcon, BoxIcon } from "@radix-ui/react-icons";

const WindowFrame: React.FC = () => {
    return (
        <nav className="w-full frame text-white flex bg-indigo-800 justify-center">
            <div className="flex-1"></div>
            <div className="flex-1 my-auto">
                <div className="text-center text-1xl">Kanban board</div>
            </div>
            <div className="flex-1 justify-end flex ">
                <button
                    className="px-4 py-3 hover:bg-indigo-500 hover:text-white transition-all duration-500"
                    onClick={minimize}
                >
                    <MinusIcon className="text-5xl font-bold"></MinusIcon>
                </button>
                <button
                    className="px-4 py-3 hover:bg-indigo-500 hover:text-white transition-all duration-500"
                    onClick={() => maximize()}
                >
                    <BoxIcon className="text-5xl font-bold"></BoxIcon>
                </button>
                <button
                    className="px-4 py-3 hover:bg-indigo-500 hover:text-white transition-all duration-500"
                    onClick={close}
                >
                    <Cross1Icon className="text-5xl font-bold"></Cross1Icon>
                </button>
            </div>
        </nav>
    );
};

const close = () => {
    electronAPI.close();
};

const minimize = () => {
    electronAPI.minimize();
};

const maximize = () => {
    electronAPI.maximize();
};

export default WindowFrame;
