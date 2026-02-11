import ProtectRoute from "@/components/protectRoute";
import Signin from "@/pages/auth/signin";
import SignUp from "@/pages/auth/signUp";
import { type RouteObject } from "react-router";
import { employerRoutes } from "./employerRoutes";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Signin />,
    },
    {
        path: "signup",
        element: <SignUp />,
    },
    {
        path: "employer",
        element: <ProtectRoute />,
        children: employerRoutes,
    },
];
