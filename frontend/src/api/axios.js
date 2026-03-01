import axios from "axios";
const VITE_BASE_URL_DEV = 'http://127.0.0.1:8000'
const api = axios.create({
  baseURL: "https://vizaymeena.pythonanywhere.com/api" || VITE_BASE_URL_DEV,
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