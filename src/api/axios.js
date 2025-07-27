import axios from "axios";
import { baseURL } from "../config";

export const publicAxios = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});