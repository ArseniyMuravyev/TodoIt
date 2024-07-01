import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5001/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});
