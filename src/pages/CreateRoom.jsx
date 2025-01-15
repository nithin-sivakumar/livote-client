import React, { useState } from "react";
import Badge from "../components/Badge";
import { useNavigate } from "react-router-dom";
import { IoCopy } from "react-icons/io5";
import { Bounce, toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { createRoom } from "../api/room";
import { io } from "socket.io-client";

const CreateRoom = () => {
  const [hostName, setHostName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const socket = io(import.meta.env.VITE_API_URL);

  socket.on("connection", () => {
    console.log("Socket Connected");
  });

  socket.on("notification", (message) => {
    toast(message, {
      type: "info",
      transition: Bounce,
    });
  });

  const handleSubmit = async () => {
    if (hostName === "") {
      toast("Please enter a name", {
        type: "warning",
        transition: Bounce,
      });
      return;
    }

    if (roomId === "") {
      setLoading(true);

      const res = await createRoom({ hostName });

      socket.emit("joinRoom", { roomId, name: hostName });

      if (res.statusCode === 201) {
        toast("Room created!", {
          type: "success",
          transition: Bounce,
        });
        setRoomId(res?.payload?.roomId);
        setLoading(false);
      } else {
        toast(res?.payload?.message, {
          type: "error",
          transition: Bounce,
        });
        setLoading(false);
      }
    } else {
      // connect the host to the room

      navigate("/setup", { state: { name: hostName, roomId } });
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(roomId);
    toast("Invite link copied to clipboard!", {
      type: "success",
      transition: Bounce,
    });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-2 px-6">
      {/* Badge */}
      <Badge />

      {/* Heading */}
      <h2 className="text-[28px] xl:text-[40px] font-normal">
        Let's <span className="font-bold">Get Started</span>
      </h2>

      {/* Sub-Heading */}
      <h4 className="text-stone-400 text-[18px] font-normal max-w-xl text-center">
        As a host, you will be able to create private live polls, and see how
        your guests respond.
      </h4>

      {/* Name */}
      <div className="w-[18rem] max-w-xl flex flex-col items-start justify-center gap-[10px] mt-5 relative border-purple-400 border-2 p-4 rounded-lg bg-purple-100">
        <p>Enter your full name</p>
        <input
          className="px-2 py-1 focus-within:outline-none focus-within:ring-2 ring-purple-400 border-2 border-purple-500 bg-purple-50 rounded-lg text-purple-600 font-bold disabled:bg-green-200"
          type="text"
          autoComplete="off"
          name="hostName"
          id="hostName"
          value={hostName}
          onChange={(e) => setHostName(e.target.value)}
          placeholder="Eg: John Smith"
          disabled={roomId.length > 0}
        />
      </div>

      {/* Room ID */}
      {roomId?.length !== 0 && (
        <div className="w-[18rem] max-w-xl flex items-center justify-center gap-[10px] mt-5 relative border-purple-400 border-2 p-4 rounded-lg bg-purple-100">
          <p>Room ID: </p>
          <div className="px-2 py-1 focus-within:outline-none focus-within:ring-2 ring-purple-400 border-2 border-purple-500 bg-purple-50 rounded-lg text-purple-600 font-bold">
            {roomId}
          </div>
          <button>
            <IoCopy color="#6d28d9" onClick={handleCopy} />
          </button>
        </div>
      )}

      {/* CTA Button */}
      <button
        onClick={handleSubmit}
        className={`bg-gradient-to-l from-purple-500 to-violet-700 px-8 py-3 mt-5 rounded-full w-[16rem] text-white hover:scale-105 transition-all duration-200 active:scale-95`}
      >
        {loading ? (
          <SyncLoader
            style={{ margin: "20px" }}
            color={"#fff"}
            loading={loading}
            size={8}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : roomId === "" ? (
          `Host as ${
            hostName.length > 0 ? hostName.split(" ")[0].slice(0, 15) : "guest"
          }`
        ) : (
          "Setup"
        )}
      </button>
    </div>
  );
};

export default CreateRoom;
