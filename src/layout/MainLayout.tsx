import React from "react";
import LeftDrawer from "../components/LeftDrawer";
import { Outlet } from "react-router-dom";

import WindowFrame from "../components/WindowFrame";

const MainLayout: React.FC = () => {
    return (
        <>
            <div className="h-svh flex flex-col select-none">
                <WindowFrame />
                <div className="flex-1 flex font-roboto">
                    <div className="h-full w-1/4 min-w-[200px]">
                        <LeftDrawer></LeftDrawer>
                    </div>
                    <div className="flex-1 p-5 h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainLayout;
