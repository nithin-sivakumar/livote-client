import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";
import { ToastContainer } from "react-toastify";
import CreateRoom from "./pages/CreateRoom";
import Setup from "./pages/Setup";
import Room from "./pages/Room";
import Removed from "./pages/Removed";
import Results from "./pages/Results";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/results/:roomId" element={<Results />} />
        <Route path="/removed" element={<Removed />} />
      </Routes>
      <ToastContainer
        closeOnClick={true}
        newestOnTop={true}
        position="top-right"
      />
    </>
  );
};

export default App;
