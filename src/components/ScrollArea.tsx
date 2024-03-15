import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface ScrollAreaProps {
    children: JSX.Element | JSX.Element[];
    className?: string | undefined;
}

const MyScrollArea: React.FC<ScrollAreaProps> = (props: ScrollAreaProps) => {
    return (
        <ScrollArea.Root className="h-full overflow-hidden">
            <ScrollArea.Viewport className={props.className + " h-full"}>
                {props.children}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
                orientation="vertical"
                className="flex w-[12px] rounded-sm"
            >
                <ScrollArea.Thumb className="bg-gray-300 transition-background flex-1 rounded-sm" />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    );
};

MyScrollArea.defaultProps = {
    className: "h-full w-full px-5",
};

export default MyScrollArea;
