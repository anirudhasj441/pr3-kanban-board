import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router/index.ts";
import { RouterProvider } from "react-router-dom";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Theme>
            <RouterProvider router={router} />
        </Theme>
    </React.StrictMode>
);
