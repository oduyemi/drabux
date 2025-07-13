import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="flex items-center justify-center bg-gray-100 w-full">
            <div className="w-full bg-white rounded-lg shadow-md">
                <Outlet /> {/* Renders SignIn, SignUp, ForgotPassword, etc. */}
            </div>
        </div>
    );
};

export default AuthLayout;
