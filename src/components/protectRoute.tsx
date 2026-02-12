import { Outlet } from "react-router";
import { Menu, Bell } from "lucide-react";
import { useState } from "react";
import Sidebar from "./custom/sidebar";
import { Button } from "./ui/button";

function ProtectRoute() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen cursor-default overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top Header */}
                <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="mr-4 text-gray-500 hover:text-gray-700 lg:hidden"
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Dashboard
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative text-gray-500 hover:text-gray-700"
                        >
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                        </Button>
                        <div className="flex items-center gap-3">
                            <div className="hidden text-right sm:block">
                                <p className="text-sm font-medium text-gray-900">
                                    John Doe
                                </p>
                                <p className="text-xs text-gray-500">
                                    Employer
                                </p>
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-indigo-200 bg-indigo-100 font-medium text-indigo-600">
                                JD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50/50 p-4 lg:p-8">
                    <div className="animate-in fade-in zoom-in-95 mx-auto max-w-7xl duration-300">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ProtectRoute;
