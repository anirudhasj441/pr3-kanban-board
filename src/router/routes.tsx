import { RouteObject } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import StartPage from "../pages/StartPage";
import ProjectPage from "../pages/ProjectPage";

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
                element: <ProjectPage />,
            },
        ],
    },
];

export default routes;
