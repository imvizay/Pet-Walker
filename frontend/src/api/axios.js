import axios from "axios";
// const VITE_BASE_URL_DEV = 'http://127.0.0.1:8000'
const renderHost = "https://pet-walker-5.onrender.com/api"
const api = axios.create({
  baseURL: `${renderHost}`,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api
