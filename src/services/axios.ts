import axios, { AxiosInstance } from "axios";
import { API_ENDPOINT } from "../config/api";

const defaultInstance = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getInstance = (timeout: number = 10000): AxiosInstance => {
  return axios.create({
    ...defaultInstance.defaults,
    timeout,
  });
};
