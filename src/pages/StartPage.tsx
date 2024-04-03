import React from "react";
import kanbanboardIcon from "../assets/icons/kanbanboard.png";

const StartPage: React.FC = () => {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center w-[25%] min-w-[180px] opacity-[.5] gap-2 ">
                <img
                    src={kanbanboardIcon}
                    className=""
                    alt=""
                    draggable="false"
                />
                {/* <div className="text-2xl">Coding Devil</div> */}
            </div>
        </div>
    );
};

export default StartPage;
