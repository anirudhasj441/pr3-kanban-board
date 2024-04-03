import { RouteObject } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import StartPage from "../pages/StartPage";
import React, { Suspense } from "react";
import ProjectPageSkeleton from "../skeletons/ProjectPage";

// eslint-disable-next-line react-refresh/only-export-components
const ProjectPage = React.lazy(() => import("../pages/ProjectPage"));

const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <StartPage />,
            },
            {
                path: ":project_id",
                element: (
                    <Suspense fallback={<ProjectPageSkeleton />}>
                        <ProjectPage />
                    </Suspense>
                ),
            },
        ],
    },
];

export default routes;
