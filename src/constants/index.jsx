import HomeIcon from "../assets/home.png";
import TransactionsIcon from "../assets/transactions.png";
import InvestIcon from "../assets/logoNew.png";
import QuestIcon from "../assets/quest.png";
import TeamIcon from "../assets/team.png";
import EducationIcon from "../assets/education.svg";
import { FiLogOut } from "react-icons/fi";


// Function to return image JSX
const renderIcon = (icon) => <img src={icon} alt="" className="w-6 h-6 transition-all filter group-hover:brightness-0 group-hover:invert" />;

export const navbarLinks = [
    {  
        links: [
            { label: "Dashboard", icon: () => renderIcon(HomeIcon), path: "/app/dashboard" },
            { label: "Transaction", icon: () => renderIcon(TransactionsIcon), path: "/app/transactions" },
            { label: "Stake", icon: () => renderIcon(InvestIcon), path: "/app/stake" },
            { label: "Team", icon: () => renderIcon(TeamIcon), path: "/app/team" },
            { label: "Quest", icon: () => renderIcon(QuestIcon), path: "/app/quest" },
            { label: "Education", icon: () => renderIcon(EducationIcon), path: "/app/education" },
        ],
    },

    {
        links: [
            {
                label: "Logout",
                icon: () => <FiLogOut size={24} className="text-blue-700 " />,
                path: "/logout",
            },
        ],
    },
]


export const InvestmentHistory = [
    {
      
        Goal: "School Fees",
        Date: "17/2/2025",
        Status: "Active",
        InitialDeposit: "12000",
        PercentageEarned:"80%",
        Earnings: "$8000",
        ExpectedROI: "200%",
    },

    {
        
        Goal: "House Rent",
        Date: "17/2/2022",
        Status: "Pending",
        InitialDeposit: "1000",
       
        Earnings: "$8000",
        PercentageEarned:"40%",
        ExpectedROI: "200%",

   
    },
    {
        Goal: "House Rent",
        Date: "17/2/2022",
        Status: "Finished",
        InitialDeposit: "1000",
        PercentageEarned:"20%",
        Earnings: "$8000",
        ExpectedROI: "200%",
   
    },
  
   
];