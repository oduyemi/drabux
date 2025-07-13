import { ChevronsLeft } from "lucide-react";
import PropTypes from "prop-types";
import profile from "../assets/profile.png";
import notify from "../assets/notify.png";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Header = ({ collapsed, setCollapsed }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-white/90 px-6 shadow-none backdrop-blur-md transition-all duration-300">
      {/* Left: Sidebar Toggle + Greeting */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-none transition hover:border-blue-500 hover:bg-blue-50"
        >
          <ChevronsLeft
            size={20}
            className={`text-gray-600 transition-transform duration-300 group-hover:text-blue-600 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>

        <div className="hidden sm:flex flex-col leading-tight">
          <span className="text-sm text-gray-500">Dashboard</span>
          <h2 className="text-lg font-semibold text-gray-800">
            Welcome back
            <span className="text-blue-600">{user?.fname ? `, ${user.fname}` : "!"}</span>
          </h2>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <Link to="/notification">
          <button className="relative group flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 shadow-none transition hover:bg-blue-50">
            <img
              src={notify}
              alt="Notifications"
              className="h-6 w-6 transition-transform duration-200 group-hover:scale-110"
            />
            {/* Optional red dot */}
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
        </Link>

        {/* Profile */}
        <Link to="/edit-profile">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200 shadow-none ring-offset-2 transition-all duration-200 hover:ring-2 hover:ring-blue-500 hover:shadow-xs cursor-pointer">
            <img
              src={profile}
              alt="User profile"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

Header.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};
