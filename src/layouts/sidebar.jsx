import { useRef, useState, forwardRef } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "../constants/index.jsx";
import logo from "../assets/novunt_logo.png";
import LogoutModal from "../Modals/LogoutModal";
import { cn } from "@/utils/cn";
import PropTypes from "prop-types";

export const Sidebar = forwardRef(({ collapsed, setCollapsed }, ref) => {
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const sidebarRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/auth/signin";
  };

  useClickOutside([sidebarRef], () => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  });

  return (
    <aside
      ref={(node) => {
        sidebarRef.current = node;
        if (ref) {
          if (typeof ref === "function") ref(node);
          else ref.current = node;
        }
      }}
      className={cn(
        "fixed left-0 top-0 z-50 flex h-full flex-col transition-all duration-300 ease-in-out",
        // Proper sidebar styling - darker with subtle warm accents
        "bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl",
        "border-r border-orange-400/10 shadow-2xl shadow-black/20",
        collapsed ? "md:w-[80px] items-center" : "md:w-[280px]",
        collapsed ? "max-md:left-[-280px]" : "max-md:left-0",
        "overflow-hidden relative"
      )}
    >
      {/* Subtle animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/3 via-yellow-500/2 to-orange-500/3 animate-pulse opacity-50"></div>
      
      {/* Logo Section - Keep warm theme but more appropriate */}
      <div className={cn(
        "flex w-full items-center justify-center border-b border-orange-400/10 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-md shadow-lg relative z-10",
        collapsed ? "h-20 px-2 py-4" : "h-20 px-6 py-4"
      )}>
        <div className="relative">
          <div className="absolute inset-0 rounded-xl bg-orange-400/10 blur-sm"></div>
          <img
            src={logo}
            alt="Novunt Logo"
            className={cn(
              "relative transition-all duration-300 filter drop-shadow-lg",
              collapsed ? "w-12 h-auto" : "w-20 h-auto"
            )}
          />
        </div>
      </div>

      {/* Navigation Links - Proper sidebar styling */}
      <div className={cn(
        "flex flex-1 flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400/30 scrollbar-track-transparent relative z-10",
        collapsed ? "px-2 py-4" : "px-4 py-6"
      )}>
        <div className="space-y-1">
          {navbarLinks.map((navbarGroup, index) => (
            <nav key={index} className="space-y-1">
              {navbarGroup.links.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  onClick={
                    link.label === "Logout"
                      ? (e) => {
                          e.preventDefault();
                          setLogoutOpen(true);
                        }
                      : undefined
                  }
                  className={({ isActive }) =>
                    cn(
                      "group relative flex items-center gap-3 rounded-xl font-medium transition-all duration-300",
                      collapsed ? "px-3 py-3 justify-center" : "px-4 py-3",
                      isActive
                        ? "bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-white shadow-lg shadow-orange-500/10 border border-orange-400/20"
                        : "text-slate-300 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-yellow-500/10 hover:text-white hover:shadow-md hover:shadow-orange-500/5 hover:border hover:border-orange-400/10"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Icon with subtle warm accents */}
                      <span
                        className={cn(
                          "flex-shrink-0 transition-all duration-300 relative",
                          collapsed && "mx-auto",
                          isActive 
                            ? "text-orange-300" 
                            : "text-slate-400 group-hover:text-orange-200"
                        )}
                      >
                        {isActive && (
                          <div className="absolute inset-0 rounded-lg bg-orange-400/10 blur-sm"></div>
                        )}
                        {typeof link.icon === "string" ? (
                          <img
                            src={link.icon}
                            alt={link.label}
                            className={cn(
                              "w-6 h-6 transition-all duration-300 relative z-10",
                              isActive ? "filter brightness-110" : "group-hover:scale-105 group-hover:brightness-105"
                            )}
                          />
                        ) : (
                          <link.icon size={22} className="relative z-10" />
                        )}
                      </span>

                      {/* Label with proper sidebar typography */}
                      {!collapsed && (
                        <span className={cn(
                          "whitespace-nowrap truncate transition-all duration-300 font-medium",
                          isActive ? "text-white" : "group-hover:text-white"
                        )}>
                          {link.label}
                        </span>
                      )}

                      {/* Subtle active indicator */}
                      {isActive && !collapsed && (
                        <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-orange-400 shadow-sm shadow-orange-400/50"></div>
                      )}

                      {/* Tooltip for collapsed state */}
                      {collapsed && (
                        <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800/90 backdrop-blur-md text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-orange-400/20">
                          {link.label}
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-orange-400/20"></div>
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              
              {/* Section separator */}
              {index < navbarLinks.length - 1 && (
                <div className={cn(
                  "my-3 border-t border-slate-600/50",
                  collapsed ? "mx-2" : "mx-4"
                )}></div>
              )}
            </nav>
          ))}
        </div>

        {/* Footer Section - Proper sidebar styling */}
        {!collapsed && (
          <div className="mt-auto pt-4 border-t border-slate-600/50 relative z-10">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-4 backdrop-blur-md border border-orange-400/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/3 via-yellow-400/2 to-orange-400/3"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-sm shadow-green-400/50"></div>
                  <span className="text-xs font-medium text-slate-300">System Status</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  All systems operational
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-orange-300/80 font-medium">v2.1.0</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-orange-400/60 rounded-full"></div>
                    <div className="w-1 h-3 bg-yellow-400/40 rounded-full"></div>
                    <div className="w-1 h-3 bg-orange-300/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};
