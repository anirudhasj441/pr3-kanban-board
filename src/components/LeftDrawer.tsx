import React from "react";
import SearchInput from "./SearchInput";
import { Button } from "@radix-ui/themes";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const LeftDrawer: React.FC = () => {
    return (
        <div className="h-full p-5 flex flex-col">
            <SearchInput />
            <ScrollArea.Root className="flex-1 overflow-hidden">
                <ScrollArea.Viewport className="h-full w-full">
                    <ul className="list-none flex flex-col gap-3">
                        <li className="p-2 rounded-md hover:bg-gray-200 transition cursor-pointer">
                            Item 1
                        </li>
                        <li className="p-2 rounded-md hover:bg-gray-200 transition cursor-pointer">
                            Item 1
                        </li>
                        <li className="p-2 rounded-md hover:bg-gray-200 transition cursor-pointer">
                            Item 1
                        </li>
                    </ul>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                    orientation="vertical"
                    className="flex w-[12px]"
                >
                    <ScrollArea.Thumb className="bg-gray-300 transition-background ease-out duration-500 flex-1 rounded-md" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
            <div className="w-full text-center">
                <Button color="blue" size={"3"} className="cursor-pointer">
                    Create Project
                </Button>
            </div>
        </div>
    );
};

export default LeftDrawer;
