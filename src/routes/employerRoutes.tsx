import AdminDashboard from "@/pages/employer/adminDashboard";
import MyJobs from "@/pages/employer/myJobs";
import Profile from "@/pages/employer/profile";
import type { RouteObject } from "react-router";

export const employerRoutes: RouteObject[] = [
    { path: "dashboard", element: <AdminDashboard /> },
    { path: "profile", element: <Profile /> },
    { path: "my-jobs", element: <MyJobs /> },
];
