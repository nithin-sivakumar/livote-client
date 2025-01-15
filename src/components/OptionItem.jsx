import React from "react";

const OptionItem = ({ item, onUpdate }) => {
  const handleValueChange = (e) => {
    onUpdate(item.id, { value: e.target.value });
  };

  const handleCorrectChange = (correct) => {
    onUpdate(item.id, { correct });
  };

  return (
    <div className="w-full max-w-xl flex flex-col md:flex-row items-center justify-center gap-[20px] mt-1 text-[16px] font-bold">
      <div className="flex-[0.6] flex items-center justify-center gap-2">
        <div className="bg-purple-600 text-white size-9 flex items-center justify-center rounded-full">
          {item.id}
        </div>
        <input
          value={item.value}
          onChange={handleValueChange}
          className="flex-1 rounded-lg focus-within:outline-none focus-within:ring-1 ring-purple-500 bg-gray-200 py-2 px-3"
        />
      </div>
      <div className="flex-[0.4] flex items-center justify-start gap-3">
        <label
          className="flex items-center justify-center gap-2"
          htmlFor={`yes-${item.id}`}
        >
          <input
            type="radio"
            id={`yes-${item.id}`}
            name={`option-${item.id}`}
            checked={item.correct}
            onChange={() => handleCorrectChange(true)}
            className="appearance-none size-4 ring-2 ring-purple-300 checked:bg-purple-600 rounded-full"
          />
          <span>Correct</span>
        </label>
        <label
          className="flex items-center justify-center gap-2"
          htmlFor={`no-${item.id}`}
        >
          <input
            type="radio"
            id={`no-${item.id}`}
            name={`option-${item.id}`}
            checked={!item.correct}
            onChange={() => handleCorrectChange(false)}
            className="appearance-none size-4 ring-2 ring-purple-300 checked:bg-purple-600 rounded-full"
          />
          <span>Wrong</span>
        </label>
      </div>
    </div>
  );
};

export default OptionItem;
