import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LeftDrawerSkeleton: React.FC = () => {
    return (
        <div className="h-full py-5 px-3 bg-gray-50 border-r-[0.2px] shadow-2xl">
            <Skeleton
                className="py-3 rounded-md m-0"
                containerClassName="flex flex-col"
                count={5}
            />
        </div>
    );
};

export default LeftDrawerSkeleton;
