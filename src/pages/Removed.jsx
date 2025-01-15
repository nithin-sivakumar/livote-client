import React, { useState } from "react";
import Badge from "../components/Badge";

const Removed = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {/* Badge */}
      <Badge />

      <h2 className="text-[40px] font-normal mt-5">You've been kicked out!</h2>

      {/* Sub-Heading */}
      <h4 className="text-stone-400 text-[18px] font-normal max-w-xl text-center">
        Uh oh! It looks like the host removed you from the poll. Please try
        again after some time.
      </h4>
    </div>
  );
};

export default Removed;
