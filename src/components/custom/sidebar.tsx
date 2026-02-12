import { NavLink } from "react-router";
import { Briefcase, Home, User, X } from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
    const navItems = [
        { path: "/employer/dashboard", label: "Dashboard", icon: Home },
        { path: "/employer/my-jobs", label: "My Jobs", icon: Briefcase },
        { path: "/employer/profile", label: "Profile", icon: User },
    ];

    return (
        <>
            {/* Mobile sidebar backdrop */}
            {isOpen && (
                <div
                    className="bg-opacity-50 fixed inset-0 z-20 bg-black lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="flex h-full flex-col">
                    {/* Logo/Brand */}
                    <div className="flex h-16 items-center justify-between border-b px-6">
                        <h1 className="text-xl font-bold text-gray-800">
                            Employer Portal
                        </h1>
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-gray-900 lg:hidden"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2 px-4 py-6">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${isActive
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`
                                }
                                onClick={onClose}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">
                                    {item.label}
                                </span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="border-t p-4">
                        <p className="text-center text-sm text-gray-500">
                            © 2024 Your Company
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
