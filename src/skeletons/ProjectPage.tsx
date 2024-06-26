/**
 * @fileoverview skeleton for Project page.
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import React from "react";
import Skeleton from "react-loading-skeleton";
import MyScrollArea from "../components/ScrollArea";

const ProjectPageSkeleton: React.FC = () => {
    return (
        <div className="h-full flex gap-5">
            {[1, 2, 3].map((item: number) => (
                <div key={item} className="flex-1 flex flex-col gap-5">
                    <div>
                        <Skeleton
                            // enableAnimation={false}
                            className="py-3 rounded-md m-0"
                            count={1}
                        />
                    </div>
                    <MyScrollArea className="flex-grow">
                        <Skeleton
                            // enableAnimation={false}
                            inline={true}
                            className="py-3 rounded-md m-0"
                            containerClassName="flex flex-col h-full gap-2"
                            count={8}
                        />
                    </MyScrollArea>
                </div>
            ))}
        </div>
    );
};

export default ProjectPageSkeleton;
