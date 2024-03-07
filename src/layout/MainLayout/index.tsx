import React from "react";
import LeftDrawer from "../../components/LeftDrawer";
import { Outlet } from "react-router-dom";
import SplitterLayout from 'react-splitter-layout';

import WindowFrame from "../../components/WindowFrame";
import 'react-splitter-layout/lib/index.css';
import './style.scss';

const MainLayout: React.FC = () => {
    return (
        <>
            <div className="h-svh flex flex-col select-none font-roboto">
                <WindowFrame />
                <div className="flex-1 relative">
                    <SplitterLayout vertical={false} percentage={true} primaryMinSize={20} secondaryInitialSize={75} secondaryMinSize={20}>
                    <div className="h-full">
                        <LeftDrawer></LeftDrawer>
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
