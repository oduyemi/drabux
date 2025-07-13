import drabuxLogo from "../assets/logo.png"; // Ensure correct path
import legacyImage from "../assets/legacy.png"; // Ensure correct path

const LegacyPoint = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br  from-[#F5F5F5] to-[#D8DAFF]">
      <div className="relative w-full max-w-md  rounded-2xl shadow-xl p-6">
     
        {/* Logo */}
        <div className="flex justify-center">
          <img src={drabuxLogo} alt="Drabux" className="w-24 h-24 object-contain" />
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-bold text-blue-900 mt-2 leading-tight">
          Something BIG <br /> is Coming!
        </h2>

        {/* Image */}
        <div className="flex justify-center my-4">
          <img src={legacyImage} alt="Legacy" className="w-64 h-44 object-cover rounded-lg" />
        </div>

        {/* Description */}
        <p className="text-gray-600 text-center text-sm leading-relaxed">
          Earn <span className="text-blue-700 font-semibold">Drabux Legacy Points</span> from weekly shared profits, team incentives, and gamification rewards.
        </p>
        <p className="text-gray-600 text-center text-sm mt-2 leading-relaxed">
          Your Legacy Points will be converted into <span className="text-blue-700 font-semibold">exclusive airdrops</span> once the Drabux blockchain launches.
        </p>
        <p className="text-gray-600 text-center text-sm mt-2 leading-relaxed">
          The more you earn, the more legacy wealth you accumulate for future blockchain rewards!
        </p>

        {/* CTA Button */}
        <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:scale-105 transition-transform">
          Drabux Legacy Point
        </button>
      </div>
    </div>
  );
};

export default LegacyPoint;
