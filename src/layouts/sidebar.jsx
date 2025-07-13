import { useEffect, useRef, useState, forwardRef } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "../constants/index.jsx";
import logo from "../assets/drabuxx.png";
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
        "fixed left-0 top-0 z-50 flex h-full flex-col border-r border-[#D8DAFF] bg-gradient-to-r from-[#D8DAFF] to-[#F5F5F5] transition-all duration-300 ease-in-out",
        collapsed ? "md:w-[72px] items-center" : "md:w-[240px]",
        collapsed ? "max-md:left-[-240px]" : "max-md:left-0",
        "overflow-hidden shadow-md"
      )}
    >
      {/* Logo */}
      <div className="flex h-20 w-full items-center justify-center border-b border-[#d6d9ff]/40 px-6 py-4">
        <img
          src={logo}
          alt="Logo"
          className={cn(
            "transition-all duration-300",
            collapsed ? "w-8 h-auto" : "w-32"
          )}
        />
      </div>

      {/* Nav Links */}
      <div className="flex flex-1 flex-col gap-y-6 overflow-y-auto px-2 py-6">
        {navbarLinks.map((navbarGroup, index) => (
          <nav
            key={index}
            className={cn("space-y-2", collapsed && "items-center")}
          >
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
                    "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#0000FE] text-white"
                      : "text-gray-700 hover:bg-[#0000FE]/90 hover:text-white"
                  )
                }
              >
                {/* Icon */}
                <span
                  className={cn(
                    "flex-shrink-0 text-blue-600 group-hover:text-white transition-all",
                    collapsed && "mx-auto"
                  )}
                >
                  {typeof link.icon === "string" ? (
                    <img
                      src={link.icon}
                      alt={link.label}
                      className="w-6 h-6 group-hover:invert"
                    />
                  ) : (
                    <link.icon size={22} />
                  )}
                </span>

                {/* Label */}
                {!collapsed && (
                  <span className="whitespace-nowrap truncate">
                    {link.label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        ))}
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
