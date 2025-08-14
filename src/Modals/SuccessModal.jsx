import { Link } from "react-router-dom";

const SuccessModal = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 z-50 p-4 mt-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold text-green-500">Verification Successful!</h2>
        <p className="mt-3">Your account is now verified.</p>
        <Link to="/auth/signin" className="block mt-4 bg-blue-500 text-white p-2 rounded">Go to Login</Link>
      </div>
    </div>
  );
};

export default SuccessModal;