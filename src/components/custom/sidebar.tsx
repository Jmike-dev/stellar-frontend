import { NavLink, useNavigate } from "react-router";
import { Briefcase, Home, User, X, LogOut } from "lucide-react";
import { toast } from "sonner";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
    const navigate = useNavigate();

    const navItems = [
        { path: "/employer/dashboard", label: "Dashboard", icon: Home },
        { path: "/employer/my-jobs", label: "My Jobs", icon: Briefcase },
        { path: "/employer/profile", label: "Profile", icon: User },
    ];
    function handleLogout() {
        sessionStorage.clear();
        navigate("/");
        toast.success("Logout successful");
    }

    return (
        <>
            {/* Mobile sidebar backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* Logo/Brand */}
                    <div className="flex h-16 items-center justify-between border-b px-6">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                                S
                            </div>
                            <span className="text-xl font-bold text-gray-900">
                                Stellar
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-900 lg:hidden"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-3 py-6">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all ${
                                        isActive
                                            ? "bg-indigo-50 text-indigo-600"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`
                                }
                                onClick={onClose}
                            >
                                <item.icon size={18} className="shrink-0" />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="border-t p-4">
                        <button
                            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
