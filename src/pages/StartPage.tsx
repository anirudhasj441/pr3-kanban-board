import React from "react";
import reactLogo from "../assets/programmer.png";

const StartPage: React.FC = () => {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center w-[40%] opacity-[.7]">
                <img src={reactLogo} className="" alt="" />
                <div className="text-2xl">Coding Devil</div>
            </div>
        </div>
    );
};

export default StartPage;
