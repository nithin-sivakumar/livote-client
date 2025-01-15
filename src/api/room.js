import axios from "axios";

const server = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const createRoom = async (data) => {
  try {
    const res = await server.post("/api/rooms", data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export { createRoom };
