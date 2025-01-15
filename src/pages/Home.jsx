import React, { useState } from "react";
import Badge from "../components/Badge";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [selected, setSelected] = useState("");

  const navigate = useNavigate();

  const choices = [
    {
      id: 1,
      type: "host",
      title: "I'm a Host",
      content: "Create live polls and ask guests to vote in real-time",
    },
    {
      id: 2,
      type: "guest",
      title: "I'm a Guest",
      content: "Vote on live polls posted by Hosts and view live results",
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-6">
      {/* Badge */}
      <Badge />

      {/* Heading */}
      <h2 className="text-[28px] xl:text-[40px] font-normal text-center">
        Welcome to <span className="font-bold">Livote</span>
      </h2>

      {/* Sub-Heading */}
      <h4 className="text-stone-400 text-[18px] font-normal max-w-xl text-center">
        Please select the role that best describes you to begin using Livote
      </h4>

      {/* Choices */}
      <div className="flex flex-col xl:flex-row items-center justify-center gap-[20px] xl:gap-[40px] mt-5">
        {choices.map((item) => (
          <div
            onClick={() => setSelected(item.type)}
            key={item.id}
            className={`border-gray-300 hover:scale-105 cursor-pointer shadow-lg border-2 flex-1 w-[20rem] h-[8rem] flex flex-col items-start justify-center p-4 rounded-[14px] transition-all duration-200 ${
              item.type === selected &&
              "bg-gradient-to-br from-purple-500 to-purple-800 text-white"
            }`}
          >
            <h4 className="font-medium text-[20px]">{item.title}</h4>
            <p className="font-light text-[16px]">{item.content}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={() =>
          navigate(
            selected === "host"
              ? "/create-room"
              : selected === "guest"
              ? "/join"
              : "/"
          )
        }
        className={`bg-gradient-to-l from-purple-500 to-violet-700 px-8 py-3 mt-5 rounded-full w-[12rem] text-white hover:scale-105 transition-all duration-200 active:scale-95`}
      >
        Continue
      </button>
    </div>
  );
};

export default Home;
