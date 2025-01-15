import React, { useState } from "react";
import Badge from "../components/Badge";
import CustomDropdown from "../components/DropDown";
import OptionItem from "../components/OptionItem";
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCopy } from "react-icons/io5";
import { Bounce, toast } from "react-toastify";

const Setup = () => {
  const [duration, setDuration] = useState(60);
  const [charCount, setCharCount] = useState(0);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);

  const socket = io(import.meta.env.VITE_API_URL);

  const location = useLocation();

  const navigate = useNavigate();

  socket.on("connect", () => {
    console.log(`Connected`);
  });

  const timers = [
    { id: 1, value: 10, content: "10 seconds" },
    { id: 2, value: 30, content: "30 seconds" },
    { id: 3, value: 45, content: "45 seconds" },
    { id: 4, value: 60, content: "60 seconds" },
    { id: 5, value: 90, content: "90 seconds" },
    { id: 6, value: 120, content: "120 seconds" },
  ];

  const handleSubmitQuestion = () => {
    console.log({ question, duration, options, roomId: location.state.roomId });

    socket.emit("askQuestion", {
      question,
      options,
      roomId: location.state.roomId,
      name: location.state.name,
    });

    socket.emit("pollStart", {
      duration,
      question,
      options,
      roomId: location.state.roomId,
    });
  };

  const handleAddOption = () => {
    setOptions([
      ...options,
      {
        id: options.at(-1) ? Number(options.at(-1).id) + 1 : 1,
        value: "",
        correct: false,
        votes: 0,
      },
    ]);
  };

  const handleUpdateOption = (id, changes) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, ...changes } : option
      )
    );
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(location?.state?.roomId);
    toast("Invite link copied to clipboard!", {
      type: "success",
      transition: Bounce,
    });
  };

  return (
    <>
      <div
        className={`w-full min-h-screen flex flex-col items-start gap-[10px] px-6 xl:px-[8.25rem] py-8 xl:py-[2rem] ${
          options.length === 0 ? "justify-center" : "justify-start"
        }`}
      >
        <Badge />
        <p className="flex items-center justify-center gap-2">
          Room id:{" "}
          <span
            onClick={handleCopy}
            className="cursor-pointer flex items-center justify-center gap-2 bg-purple-200 px-3 py-1 rounded-lg border-2 border-purple-500"
          >
            {location.state.roomId}
            <button>
              <IoCopy color="#6d28d9" />
            </button>
          </span>
          <span
            onClick={() => navigate(`/results/${location?.state?.roomId}`)}
            className="cursor-pointer flex items-center justify-center gap-2 bg-purple-200 px-3 py-1 rounded-lg border-2 border-purple-500"
          >
            View latest poll result
          </span>
        </p>
        <h2 className="text-[28px] xl:text-[40px]">
          Let's <span className="font-bold">Get Started 💜</span>
        </h2>
        <h4 className="max-w-xl">
          Ahoy captain! You now possess the ability to create and manage polls,
          ask questions, and monitor your guest's responses in real-time.
        </h4>
        <div className="flex items-end justify-between max-w-xl w-full mt-4">
          <p className="font-medium text-[18px]">Enter your question</p>
          <CustomDropdown
            timers={timers}
            duration={duration}
            setDuration={setDuration}
          />
        </div>
        <div className="w-full max-w-xl relative mt-1">
          <textarea
            value={question}
            className="bg-purple-100 border border-purple-500 rounded-lg focus-within:outline-none focus-within:ring-2 ring-purple-400 ring-offset-2 shadow-lg max-w-xl w-full h-20 resize-none px-3 py-3"
            name="question"
            placeholder="Eg: Why is this app so cool?"
            id="question"
            maxLength={100}
            onChange={(e) => {
              setQuestion(e.target.value);
              setCharCount(e.target.value?.length);
            }}
          ></textarea>
          <p
            className={`absolute bottom-0 right-0 m-3 ${
              charCount === 100 ? "text-red-500" : "text-purple-500"
            }`}
          >
            {charCount}/100
          </p>
        </div>
        {options.length >= 1 && (
          <div className="w-full max-w-xl hidden md:flex items-center justify-center gap-[20px] mt-4 text-[16px] font-bold">
            <p className="flex-[0.6]">Edit options</p>
            <p className="flex-[0.4] text-left">Is it correct?</p>
          </div>
        )}
        {options.map((item) => (
          <OptionItem key={item.id} item={item} onUpdate={handleUpdateOption} />
        ))}
        <button
          onClick={handleAddOption}
          className="flex items-center justify-center gap-2 px-8 py-2 bg-purple-200 border-purple-400 border-2 rounded-lg my-5"
        >
          <span>Add option</span>
        </button>
        <div className="w-full flex items-center justify-end">
          <button
            onClick={handleSubmitQuestion}
            className={`bg-gradient-to-l from-purple-500 to-violet-700 px-8 py-3 mt-5 rounded-full w-[12rem] text-white hover:scale-105 transition-all duration-200 active:scale-95`}
          >
            Ask Question
          </button>
        </div>
      </div>
    </>
  );
};

export default Setup;
