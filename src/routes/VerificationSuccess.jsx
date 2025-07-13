import { useState } from "react";
import { useNavigate } from "react-router-dom";
import success from "../assets/success.png";

const VerificationSuccess = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const handleVerificationSuccess = () => {
    setIsVisible(false); 
    setTimeout(() => {
      navigate("/auth/signin"); 
    }, 300); 
  };

  if (!isVisible) return null; 

  return (
    <div className="fixed inset-0 bg-black/55 bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-[#F5F5F5] to-[#D8DAFF] text-black p-6 rounded-lg shadow-2xl w-96 relative animate-fadeIn text-center">
        <h1 className="text-3xl font-semibold mb-4 text-[#00006D] font-grotesk">
          Verification Successful
        </h1>
        <p className="text-sm text-gray-600 mb-4 font-serif">
          Your account has been successfully verified
        </p>
        <img src={success} alt="Verification Successful" className="mx-auto mb-4 w-10 h-10" />
        
        <button
          onClick={handleVerificationSuccess}
          className="py-4 w-full text-white px-6 bg-gradient-to-b from-[#0000FE] to-[#00006D] hover:opacity-90 transition rounded-lg font-serif md:text-xl lg:text-xl"
        >
          Proceed to Sign In
        </button>
      </div>
    </div>
  );
};

export default VerificationSuccess;
