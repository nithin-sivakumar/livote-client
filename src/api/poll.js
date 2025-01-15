import axios from "axios";

const server = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const getLatestPoll = async (roomId) => {
  try {
    const res = await server.get(`/api/poll/${roomId}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export { getLatestPoll };
