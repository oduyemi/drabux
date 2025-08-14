import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-100 transition-colors">
            {/* Main content area - full width */}
            <div className="w-full">
                <div className="min-h-screen overflow-y-auto overflow-x-hidden">
                    {children ? children : <Outlet />} {/* Render children or Outlet */}
                </div>
            </div>
        </div>
    );
};

export default Layout;
