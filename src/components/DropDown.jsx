import { useState } from "react";

function CustomDropdown({ timers, duration, setDuration }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setDuration(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-fit">
      <div
        className="bg-white border-2 border-purple-500 text-purple-700 font-medium xl:px-4 xl:py-2 py-1 px-3 text-center rounded-lg shadow-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {timers.find((item) => item.value === duration)?.content ||
          "Select time"}
      </div>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white border border-purple-500 rounded-lg shadow-lg z-10">
          {timers.map((item) => (
            <li
              key={item.id}
              className="px-2 text-center py-2 rounded-lg hover:bg-purple-500 hover:text-white cursor-pointer transition-colors ease-in-out duration-150"
              onClick={() => handleSelect(item.value)}
            >
              {item.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomDropdown;
