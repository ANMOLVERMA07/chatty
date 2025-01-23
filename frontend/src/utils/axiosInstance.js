import axios from "axios";

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL:import.meta.env.MODE==="development" ? "http://localhost:8888/api":"/api",
  withCredentials: true,
});