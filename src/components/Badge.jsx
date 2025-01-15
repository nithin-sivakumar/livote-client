import React from "react";
import { HiSparkles } from "react-icons/hi";

const Badge = () => {
  return (
    <div className="text-white bg-gradient-to-t from-purple-500 to-violet-700 flex items-center justify-center gap-1 px-4 py-1 rounded-full text-[14px]">
      <HiSparkles />
      <span>Livote</span>
    </div>
  );
};

export default Badge;
