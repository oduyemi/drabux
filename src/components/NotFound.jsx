import React from "react";
import { Link } from "react-router-dom";
import { Ghost, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#f9fafb] px-5 text-center">
      {/* Ghost Icon */}
      <div className="flex items-center justify-center rounded-full bg-blue-50 p-6 shadow-sm">
        <Ghost className="h-16 w-16 text-blue-600" />
      </div>

      {/* 404 Text */}
      <h1 className="mt-8 text-6xl font-extrabold text-gray-900 tracking-tight">404</h1>
      <p className="mt-4 text-xl font-medium text-gray-600">
        Oops! This page is off chasing squirrels... 🐿️
      </p>
      <p className="mt-2 max-w-md text-sm text-gray-500">
        The page you’re looking for doesn’t exist, moved to another dimension,
        or just never got coded. We blame the intern. 🤷‍♂️
      </p>

      {/* CTA */}
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700 transition-all"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Reality (Home)
      </Link>

      {/* Easter Egg or Footer Joke */}
      <p className="mt-6 text-xs text-gray-400 italic">
        If you find this page, you're either lost... or a QA engineer.
      </p>
    </div>
  );
};

export default NotFound;
