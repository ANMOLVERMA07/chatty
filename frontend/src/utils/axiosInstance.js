import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "localhost:8888/api",
  withCredentials: true,
});