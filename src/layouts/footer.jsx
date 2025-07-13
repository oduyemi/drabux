export const Footer = () => {
  return (
    <footer className="mt-12 w-full border-t border-gray-200 bg-white px-6 py-6 text-sm text-gray-600 dark:border-gray-700 dark:bg-[#0f172a] dark:text-gray-300">
      <div className="mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-base font-medium text-slate-800 dark:text-slate-200">
          © {new Date().getFullYear()} <span className="font-bold text-[#00006D]">Drabux</span>. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-sm">
          <a
            href="#"
            className="text-gray-500 transition hover:text-[#00006D] dark:hover:text-white"
          >
            Privacy Policy
          </a>
          <span className="h-3 w-px bg-gray-400"></span>
          <a
            href="#"
            className="text-gray-500 transition hover:text-[#00006D] dark:hover:text-white"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};
