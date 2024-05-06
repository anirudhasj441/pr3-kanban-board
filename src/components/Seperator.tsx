import React from "react";

type Direction = "horizontal" | "vertical";

interface SeperatorProps {
    dir?: Direction | undefined;
    className?: string | undefined;
}

const Seperator: React.FC<SeperatorProps> = (props: SeperatorProps) => {
    return props.dir === "horizontal" ? (
        <div
            className={["w-full bg-slate-600 h-[2px]", props.className].join(
                " "
            )}
        ></div>
    ) : (
        <div
            className={["h-full bg-slate-600 w-[1px]", props.className].join(
                " "
            )}
        ></div>
    );
};

Seperator.defaultProps = {
    dir: "horizontal",
};

export default Seperator;
