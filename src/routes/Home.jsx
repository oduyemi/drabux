import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import backdrop from "../assets/point.png";
import getStartedImage from "../assets/get_started.png";

const Home = () => {
  const [text, setText] = useState("");
  const fullText =
    "Automate your investments, track your profit, and grow your wealth effortlessly.";
  const typingSpeed = 50;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, typingSpeed);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0000FE] to-[#00006D] px-6 text-white overflow-hidden">
      {/* Logo */}
      <div className="absolute top-6 left-6 z-20">
        <img src={logo} alt="Drabux Logo" className="w-28 sm:w-32" />
      </div>

      {/* Backdrop Image */}
      <div className="absolute top-0 left-1/2 z-0 w-[80%] max-w-[500px] -translate-x-1/2 opacity-30 mix-blend-lighten blur-sm">
        <img src={backdrop} alt="Backdrop" className="w-full" />
      </div>

      {/* Main Content */}
      <div className="z-10 text-center mt-16 sm:mt-28">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-sans tracking-tight drop-shadow-lg">
          Welcome to <span className="text-yellow-300">Novunt</span>
        </h1>

        <p className="mt-5 min-h-[60px] px-2 text-base sm:text-lg lg:text-xl leading-relaxed font-light text-gray-100">
          {text}
        </p>

        <Link to="/auth/create">
          <button className="mt-8 rounded-full bg-white px-8 py-3 text-lg font-semibold text-[#00006D] shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-200 hover:shadow-xl">
            Get Started
          </button>
        </Link>
      </div>

      {/* Mobile-only Image */}
      <div className="absolute bottom-0 left-0 w-full md:hidden">
        <img
          src={getStartedImage}
          alt="Get Started"
          className="w-full opacity-80 object-cover"
        />
      </div>
    </div>
  );
};

export default Home;
