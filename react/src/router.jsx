import { createBrowserRouter } from "react-router-dom";

import Login from "./views/Login";
import Register from "./views/Register";
import Users from "./views/Users";
import NotFound from "./views/NotFound";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/users",
        element: <Users />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
