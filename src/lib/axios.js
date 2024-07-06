import axios from "axios";

const api = axios.create({
  baseURL: "https://randomuser.me/api/",
  headers: {
    "Cache-Control": "max-age=1800",
  },
});

export default api;
