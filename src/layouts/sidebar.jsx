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

  // Use custom useClickOutside hook for mobile menu collapse
  useClickOutside([
    sidebarRef
  ], (event) => {
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
        "fixed flex h-full flex-col overflow-x-hidden border-r border-[#D8DAFF] bg-gradient-to-r from-[#D8DAFF] to-[#F5F5F5] transition-all",
        collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
        collapsed ? "max-md:left-[-240px]" : "max-md:left-0",
        "left-0 z-50"
      )}
    >
      {/* Logo */}
      <div className="flex justify-center p-4 rounded-md mr-24">
        <img src={logo} alt="Logo" className="w-30 h-8" />
      </div>

      {/* Nav Links */}
      <div className="flex w-full flex-col gap-y-10 overflow-y-auto p-3 font-semibold mt-4">
        {navbarLinks.map((navbarGroup, index) => (
          <nav key={index} className={cn("sidebar-group", collapsed && "md:items-center")}>
            {navbarGroup.links.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className="sidebar-item group flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition-all"
                onClick={
                  link.label === "Logout"
                    ? (e) => {
                        e.preventDefault();
                        setLogoutOpen(true);
                      }
                    : undefined
                }
              >
                {/* Icon */}
                {typeof link.icon === "string" ? (
                  <img
                    src={link.icon}
                    alt={link.label}
                    className="w-6 h-6 flex-shrink-0 transition-all group-hover:brightness-0 group-hover:invert"
                  />
                ) : (
                  <link.icon size={22} className="flex-shrink-0 group-hover:text-white transition-all" />
                )}

                {/* Label */}
                {!collapsed && (
                  <p className="whitespace-nowrap text-gray-800 group-hover:text-white">
                    {link.label}
                  </p>
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
