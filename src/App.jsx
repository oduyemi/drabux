import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { AuthProvider } from "@/contexts/AuthContext"; // Import the AuthProvider
import Layout from "@/routes/layout";
import Home from "@/routes/Home"; // Import the standalone home page
import DashboardPage from "@/routes/dashboard/page";
import AuthLayout from "@/routes/AuthLayout";

import Transactions from "@/components/Transactions";
import Gamify from "../src/routes/gamify";
import Team from "@/components/Team";
import SignIn from "@/routes/SignIn";
import VerificationSuccess from "@/routes/VerificationSuccess";
import NewPassword from "@/routes/NewPassword";
import ForgotPassword from "@/routes/ForgotPassword";
import SignUp from "./routes/Create";
import EditProfile from "../src/routes/EditProfile";
import Notification from "./routes/Notification";
import LegacyPoint from "./routes/LegacyPoint";
import Deposit from "./routes/Deposit";
import Ranking from "./routes/Ranking";
import WithdrawalConfirm from "./routes/WithdrawalConfirm";
import DepositConfirm from "./routes/DepositConfirm";
import DepositProcess from "./routes/DepositProcess";
import WithdrawalProcessing from "./routes/WithdrawalProcessing";
import InvestmentProcessing from "./routes/InvestmentProcessing";
import WithdrawUSDT from "./routes/WithdrawUSDT";
import NotFound from "./components/NotFound";


const router = createBrowserRouter([
    // Standalone Home Page Route
    {
        path: "/",
        element: <Home />, 
    },
    {
        path: "/app",
        element: <Layout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "dashboard", element: <DashboardPage /> },
          { path: "transactions", element: <Transactions /> },
          { path: "invest", element: <Deposit /> },
          { path: "team", element: <Team /> },
          { path: "quest", element: <Gamify /> },
          { path: "deposit", element: <Deposit /> },
          { path: "withdraw-usdt", element: <WithdrawUSDT /> },
          { path: "confirm-withdrawal", element: <WithdrawalConfirm /> },
          { path: "investment-in-process", element: <InvestmentProcessing /> },
          { path: "confirm-deposit", element: <DepositConfirm /> },
          { path: "legacy-point", element: <LegacyPoint /> },
          { path: "deposit-process", element: <DepositProcess /> },
          { path: "edit-profile", element: <EditProfile /> },
          { path: "notification", element: <Notification /> },
          { path: "withdrawal-process", element: <WithdrawalProcessing /> },
          { path: "ranking", element: <Ranking /> },
          { path: "verification-success", element: <VerificationSuccess /> },

          // 🧼 Catch-all for /app/*
          { path: "*", element: <NotFound /> },
        ]
      },
    
    

    // Authentication Pages
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "signin", element: <SignIn /> },
            { path: "create", element: <SignUp /> },
            { path: "verification-success", element: <VerificationSuccess /> },
           
            { path: "new-password", element: <NewPassword /> },
            { path: "forgot-password", element: <ForgotPassword /> },
        ],
    },
    
    // Catch-all for all other unmatched routes (e.g. /random-url)
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
    return (
        <AuthProvider>
            <ThemeProvider storageKey="theme">
                <RouterProvider router={router} />
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
