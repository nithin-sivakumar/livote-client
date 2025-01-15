import React, { useEffect, useState } from "react";
import Badge from "../components/Badge";
import { Bounce, toast } from "react-toastify";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const socket = io(import.meta.env.VITE_API_URL);

  useEffect(() => {
    socket.on("notification", (message) => {
      toast(message, {
        type: "default",
        transition: Bounce,
        autoClose: 1500,
      });
    });

    socket.on("error", (message) => {
      setError(message);
      setName("");
      setRoomId("");
      toast(message, {
        type: "error",
        transition: Bounce,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  console.log(error);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast("Please enter your name.", {
        type: "warning",
        transition: Bounce,
      });
      return;
    }

    if (roomId.trim() === "") {
      toast("Please enter a room ID.", {
        type: "warning",
        transition: Bounce,
      });
      return;
    }

    socket.emit("joinRoom", { roomId, name });

    setTimeout(() => {
      navigate(`/room/${roomId}`, { state: { roomId, name } });
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-screen flex flex-col items-center justify-center px-6"
    >
      <Badge />

      <h2 className="text-[28px] xl:text-[40px] font-normal">
        Let's <span className="font-bold">Get Started</span>
      </h2>

      <h4 className="text-stone-400 text-[18px] font-normal max-w-xl text-center">
        As a guest, you will be able to submit your answers, participate in live
        polls, and see how your responses compare with others.
      </h4>

      <div className="w-fit max-w-xl flex flex-col items-start justify-center gap-[10px] mt-5 relative border-purple-400 border-2 p-4 rounded-lg bg-purple-100">
        <p>Enter your full name</p>
        <input
          className="px-2 py-1 focus-within:outline-none focus-within:ring-2 ring-purple-400 border-2 border-purple-500 bg-purple-50 rounded-lg text-purple-600 font-bold"
          type="text"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Eg: John Smith"
        />
      </div>

      <div className="w-fit max-w-xl flex flex-col items-start justify-center gap-[10px] mt-5 relative border-purple-400 border-2 p-4 rounded-lg bg-purple-100">
        <p>Enter room id</p>
        <input
          className="px-2 py-1 focus-within:outline-none focus-within:ring-2 ring-purple-400 border-2 border-purple-500 bg-purple-50 rounded-lg text-purple-600 font-bold"
          type="text"
          autoComplete="off"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Eg: qwn-kxou-ans"
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-l from-purple-500 to-violet-700 px-8 py-3 mt-5 rounded-full w-[16rem] text-white hover:scale-105 transition-all duration-200 active:scale-95"
      >
        {`Join as ${
          name.length > 0 ? name.split(" ")[0].slice(0, 10) : "guest"
        }`}
      </button>
    </form>
  );
};

export default Join;
