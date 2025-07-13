import { ChevronsLeft } from "lucide-react";
import PropTypes from "prop-types";
import profile from "../assets/profile.png";
import notify from "../assets/notify.png";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Header = ({ collapsed, setCollapsed }) => {
    const { user } = useAuth();
    return (
        <header className="relative flex h-[60px] items-center justify-between bg-gradient-to-r from-[#D8DAFF] to-[#F5F5F5] px-4 shadow-md transition-colors">
            <div className="flex items-center gap-x-3">
                {/* Left arrow icon to toggle sidebar */}
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)} // Toggle the sidebar state
                >
                    <ChevronsLeft className={collapsed ? "rotate-180 transition-transform" : "transition-transform"} />
                </button>

                <div className="flex flex-1 flex-col md:ml-10">
                    {/* Show user's first name from AuthContext */}
                    <h2 className="text-lg font-semibold text-[#00006D]">
                        Welcome Back{user && user.fname ? `, ${user.fname}` : "!"}
                    </h2>
                </div>
            </div>

            {/* Right-side icons (Notification & Profile) */}
            <div className="flex items-center gap-x-3">
                {/* Notification Icon */}
                <Link to="/notification">
                    <button className="btn-ghost flex size-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-200 active:scale-90">
                        <img
                            className="h-6 w-6 cursor-pointer transition-transform duration-300 hover:scale-110"
                            src={notify}
                            alt="notification"
                        />
                    </button>
                </Link>

                {/* Profile Icon */}
                <Link to="/edit-profile">
                    <button className="flex size-10 items-center justify-center overflow-hidden rounded-full transition-all duration-300 hover:ring-2 hover:ring-blue-500 active:scale-90">
                        <img
                            className="h-6 w-6 cursor-pointer transition-transform duration-300 hover:scale-110"
                            src={profile}
                            alt="profile"
                        />
                    </button>
                </Link>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};
