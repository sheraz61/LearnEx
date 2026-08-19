import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="relative flex justify-center items-center">
        {/* Outer glowing ring */}
        <div className="absolute w-16 h-16 rounded-full border-4 border-transparent border-t-[#7c5cff] border-b-[#7c5cff] animate-spin"></div>
        {/* Inner pulsing circle */}
        <div className="w-8 h-8 bg-[#7c5cff] rounded-full animate-pulse shadow-[0_0_15px_rgba(124,92,255,0.6)]"></div>
      </div>
    </div>
  );
};

export default Loader;