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
  const authData = localStorage.getItem("auth");

  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      const token = parsed?.state?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Failed to parse auth token:", err);
    }
  }

  return config;
});

// ⚠️ Optional: redirect on 401 errors
authAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("auth");
      // window.location.href = "/login"; // optional: redirect user to login page
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