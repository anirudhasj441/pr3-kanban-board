import { RouteObject } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import StartPage from "../pages/StartPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <StartPage />,
            },
        ],
    },
];

export default routes;
