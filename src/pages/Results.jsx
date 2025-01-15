import React, { useEffect, useState } from "react";
import { FaStopwatch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getLatestPoll } from "../api/poll";

const Results = () => {
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("");
  const [total, setTotal] = useState(0);

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await getLatestPoll(params.roomId);
        if (res.statusCode === 200) {
          setQuestion(res?.payload?.question);
          setOptions(res?.payload?.options);
          setTotal(
            res?.payload?.options?.reduce((acc, item) => {
              return acc + item.votes;
            }, 0)
          );
        }
      } catch (error) {}
    };

    fetchPoll();
  }, [params.roomId]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-2">
      <div className="w-full max-w-2xl font-bold text-[28px] flex items-center justify-start gap-10">
        <p>Question</p>
      </div>
      <div className="w-full max-w-2xl flex flex-col items-start justify-center border-2 rounded-lg">
        <p className="w-full bg-gradient-to-tl from-black to-stone-500 text-white p-2 rounded-t-lg text-[24px] px-5">
          {question}
        </p>
        <div className="p-4 w-full flex flex-col items-start justify-center gap-[16px]">
          {options.map((item, index) => {
            const percentage =
              total > 0 ? ((item.votes / total) * 100).toFixed(1) : 0;

            return (
              <div
                key={index}
                className={`list-none flex items-center justify-between gap-4 border-purple-500 border-2 w-full p-2 rounded-lg cursor-pointer hover:scale-[101%] transition-all duration-150 relative`}
              >
                <div className="flex items-center justify-center gap-4">
                  <div
                    style={{
                      width: `${percentage}%`,
                    }}
                    className={`bg-purple-600/50 absolute left-0 h-full transition-all duration-500`}
                  ></div>
                  <span className="size-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold p-2">
                    {index + 1}
                  </span>
                  <li>{item.value}</li>
                </div>
                <li className="">{percentage}%</li>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        className={`bg-gradient-to-l from-purple-500 to-violet-700 px-8 py-3 mt-0 rounded-full w-[12rem] text-white hover:scale-105 transition-all duration-200 active:scale-95`}
      >
        Close
      </button>
    </div>
  );
};

export default Results;
