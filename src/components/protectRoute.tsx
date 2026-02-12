import { Outlet } from "react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "./custom/sidebar";

function ProtectRoute() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen cursor-default bg-gray-100">
            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top Header */}
                <header className="flex h-16 items-center bg-white px-6 shadow-sm">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="mr-4 text-gray-600 hover:text-gray-900 lg:hidden"
                    >
                        <Menu size={24} />
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Welcome Back john doe
                    </h2>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default ProtectRoute;
