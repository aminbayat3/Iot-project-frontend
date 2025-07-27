// src/api/axios.ts
import axios from "axios";
import { baseURL } from "../config";

// 🔐 Axios instance for authenticated requests
export const authAxios = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔑 Attach Firebase ID token from localStorage
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or from Zustand
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ⚠️ Optional: redirect on 401 errors
authAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// 🌐 Public instance for unauthenticated routes
export const publicAxios = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});