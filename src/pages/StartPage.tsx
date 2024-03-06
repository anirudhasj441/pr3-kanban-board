import React from "react";
import programmerImg from "../assets/programmer.png";
import { Button } from "@radix-ui/themes";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { counterStore } from "../stores";

const StartPage: React.FC = () => {
    const count = counterStore((state) => state.count);
    const countIncrement = counterStore((state) => state.increment);
    const countDecrement = counterStore((state) => state.decrement);
    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center w-[40%] opacity-[.7] gap-2">
                <img src={programmerImg} className="" alt="" />
                <div className="text-2xl">Coding Devil</div>
                <div className="flex gap-3">
                    <Button onClick={countDecrement}>
                        <MinusIcon />
                    </Button>
                    <div className="text-2xl">{count}</div>
                    <Button onClick={countIncrement}>
                        <PlusIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
