import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SplitterLayout from "react-splitter-layout";
import LeftDrawerSkeleton from "../../skeletons/LeftDrawer";
import WindowFrame from "../../components/WindowFrame";
import "react-splitter-layout/lib/index.css";
import "./style.scss";

const LeftDrawer = React.lazy(() => import("../../components/LeftDrawer"));

const MainLayout: React.FC = () => {
    return (
        <>
            <div className="h-svh flex flex-col select-none font-roboto bg-gray-100">
                <WindowFrame />
                <div className="flex-1 relative">
                    <SplitterLayout
                        vertical={false}
                        percentage={true}
                        primaryMinSize={20}
                        secondaryInitialSize={75}
                        secondaryMinSize={20}
                    >
                        <div className="h-full">
                            <Suspense fallback={<LeftDrawerSkeleton />}>
                                <LeftDrawer></LeftDrawer>
                            </Suspense>
                        </div>
                        <div className="p-5 h-full">
                            <Outlet />
                        </div>
                    </SplitterLayout>
                </div>
            </div>
        </>
    );
};

export default MainLayout;
