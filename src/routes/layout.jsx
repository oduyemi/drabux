import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "@/hooks/use-click-outside";

import { Sidebar } from "@/layouts/sidebar";
import { Header } from "@/layouts/header";

import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

const Layout = ({ children }) => {
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);

    const sidebarRef = useRef(null);
    const layoutRef = useRef(null); // Reference for the entire layout

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);


    return (
        <div className="min-h-screen bg-slate-100 transition-colors" ref={layoutRef}>
            {/* Overlay when sidebar is open on mobile */}
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
                    !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30 max-md:pointer-events-auto",
                )}
                onClick={() => {
                    if (!isDesktopDevice && !collapsed) setCollapsed(true);
                }}
            />
            {/* Sidebar */}
            <Sidebar ref={sidebarRef} collapsed={collapsed} />
            {/* Main content area */}
            <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[70px]" : "md:ml-[240px]")}>
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
                    {children ? children : <Outlet />} {/* Render children or Outlet */}
                </div>
            </div>
        </div>
    );
};

export default Layout;
