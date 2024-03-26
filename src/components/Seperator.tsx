import React from "react";

type Direction = "horizontal" | "vertical";

interface SeperatorProps {
    dir?: Direction | undefined;
}

const Seperator: React.FC<SeperatorProps> = (props: SeperatorProps) => {
    return props.dir === "horizontal" ? (
        <div className="w-full bg-slate-600 h-[2px] my-1"></div>
    ) : (
        <div className="h-full bg-slate-600 w-[2px]"></div>
    );
};

Seperator.defaultProps = {
    dir: "horizontal",
};

export default Seperator;
