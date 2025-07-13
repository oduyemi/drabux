import { useMediaQuery } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import { Sidebar } from "@/layouts/sidebar";
import { Header } from "@/layouts/header";
import { Outlet } from "react-router-dom";
import { cn } from "@/utils/cn";

const Layout = ({ children }) => {
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);

    // Update collapsed state when device changes from mobile to desktop or vice versa
    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    return (
        <div className="min-h-screen bg-slate-100 transition-colors relative">
            {/* Overlay background when sidebar is open on mobile */}
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
                    !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30",
                )}
                onClick={() => setCollapsed(true)} // Close sidebar if clicked outside on mobile
            />
            
            {/* Sidebar with toggle for mobile */}
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <div
                className={cn(
                    "transition-[margin] duration-300",
                    collapsed ? "md:ml-[70px]" : "md:ml-[240px]",
                    "relative z-10" // Make sure content is above the sidebar
                )}
            >
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                <div className="h-[calc(100vh-60px)] overflow-y-auto p-6">
                    {children ? children : <Outlet />}
                </div>
            </div>
        </div>
    );
};

export default Layout;
