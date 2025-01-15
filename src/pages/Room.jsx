import React, { useEffect, useState } from "react";
import Badge from "../components/Badge";
import { SyncLoader } from "react-spinners";
import { FaStopwatch } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { toast, Bounce } from "react-toastify";

const Room = () => {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(undefined);
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("");
  const [duration, setDuration] = useState(0);
  const [voted, setVoted] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  const socket = io(import.meta.env.VITE_API_URL);

  useEffect(() => {
    socket.emit("silentJoinRoom", {
      roomId: location.state.roomId,
      name: location.state.name,
    });
  }, []);

  useEffect(() => {
    socket.on("notification", (message) => {
      toast(message, {
        type: "default",
        transition: Bounce,
        autoClose: 1500,
      });
    });

    socket.on("error", (message) => {
      toast(message, {
        type: "error",
        transition: Bounce,
      });
    });

    socket.on("pollStart", ({ question, options, duration }) => {
      setLoading(false);
      setQuestion(question);
      setOptions(options);
      setDuration(duration);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    let timer;
    if (duration > 0) {
      timer = setInterval(() => {
        setDuration((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [duration]);

  const handleSubmit = () => {
    console.log({
      selected,
      roomId: location.state.roomId,
      name: location.state.name,
    });
    if (duration !== 0) {
      setVoted(true);
      socket.emit("vote", {
        selected,
        roomId: location.state.roomId,
        question,
      });
    } else {
      navigate(`/results/${location?.state?.roomId}`);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-[20px] px-6">
      <Badge />

      <SyncLoader
        style={{ margin: "20px" }}
        color={"#6d28d9"}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      {loading && (
        <div>
          <p className="font-medium text-[18px]">
            Welcome,{" "}
            <span className="bg-gradient-to-r from-purple-500 to-purple-800 p-0 bg-clip-text text-transparent rounded-[7px] font-bold text-2xl">
              {location.state.name}
            </span>
          </p>
          <p className="font-medium text-[32px]">
            Waiting for host to start poll...
          </p>
        </div>
      )}

      {!loading && (
        <>
          <div className="w-full max-w-2xl font-bold text-[28px] flex items-center justify-start gap-10">
            <p>Question</p>
            <div className="flex items-center justify-center gap-2 text-[16px]">
              <FaStopwatch />
              <span className="text-red-600">
                {String(Math.floor(duration / 60)).padStart(2, "0")} :{" "}
                {String(duration % 60).padStart(2, "0")}
              </span>
            </div>
          </div>
          <div className="w-full max-w-2xl flex flex-col items-start justify-center border-2 rounded-lg">
            <p className="w-full bg-gradient-to-tl from-black to-stone-500 text-white p-2 rounded-t-lg text-[24px] px-5">
              {question}
            </p>
            <div className="p-4 w-full flex flex-col items-start justify-center gap-[16px]">
              {options.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelected(item.id)}
                  className={`list-none flex items-center justify-start gap-4 border-purple-500 border-2 w-full p-2 rounded-lg cursor-pointer hover:scale-[101%] transition-all duration-150 ${
                    item.id === selected
                      ? "bg-purple-500 text-white"
                      : "bg-purple-200 text-black"
                  }`}
                >
                  <span className="size-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold p-2">
                    {item.id}
                  </span>
                  <li>{item.value}</li>
                </div>
              ))}
            </div>
          </div>
          {duration > 0 && (
            <button
              onClick={handleSubmit}
              className={`bg-gradient-to-l from-purple-500 to-violet-700 px-8 py-3 mt-0 rounded-full w-[18rem] text-white hover:scale-105 transition-all duration-200 active:scale-95`}
            >
              {voted ? (
                <div className="flex items-center justify-center gap-2">
                  <span>Waiting for others</span>
                  <SyncLoader
                    style={{ margin: "10px" }}
                    color={"#fff"}
                    loading={voted}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          )}
          {duration === 0 && (
            <button
              onClick={handleSubmit}
              className={`bg-gradient-to-l from-purple-500 to-violet-700 px-8 py-3 mt-0 rounded-full w-[12rem] text-white hover:scale-105 transition-all duration-200 active:scale-95`}
            >
              View Results
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Room;
