import React from "react";
import { Task } from "../../types";
import Space from "./Space";
import { Icon } from "@iconify-icon/react";
import TaskCard from "./TaskCard";

interface BoardProps {
    title: string;
    tasks: Task[];
    color_class?: string | undefined;
}

const Board: React.FC<BoardProps> = (props: BoardProps) => {
    return (
        <div className="flex flex-col h-full flex-1 gap-5">
            <div
                className={`
                    header
                    px-3
                    py-2
                    border-t-4
                    bg-white
                    shadow-md
                    rounded-md
                    flex
                    items-center
                    gap-2
                    text-sm
                    group
                    ${props.color_class}
                `}
            >
                <h6 className="">{props.title}</h6>
                <div className="badge px-2 py-0  rounded-xl border-[1px] border-slate-300">
                    {props.tasks.length}
                </div>
                <Space />
                <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-300 rounded-md">
                    <Icon
                        icon="material-symbols:add"
                        className="block text-slate-600"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
            <div className="board group rounded-md flex-1 flex flex-col gap-2">
                {props.tasks.map((task: Task) => (
                    <TaskCard key={task._id} task={task} />
                ))}
                <button className="text-sm text-slate-600 opacity-0 bg-gray-100 hover:bg-gray-300 group-hover:opacity-100 px-2 py-2 w-max rounded-md transition-opacity duration-500 flex gap-1 items-center">
                    <Icon icon="material-symbols:add" className="block" />
                    <div>New Task</div>
                </button>
            </div>
        </div>
    );
};

Board.defaultProps = {
    color_class: "border-indigo-700",
};

export default Board;
