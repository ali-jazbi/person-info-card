import axios from "axios";

axios.defaults.withCredentials = true;

const BASE_URL = window.location.origin + "/api"; // for publish
// const BASE_URL = "http://192.168.10.10:3332"; // for publish
// const BASE_URL = window.location.origin?.replace(":5173", ":4500"); // for publish

const LOCAL_URL = "http://localhost:5173/api";
// const LOCAL_URL = "http://localhost:3333"; // for publish

export let serverEndpoint = window.location.hostname.toLowerCase().includes("localhost:5173") ? LOCAL_URL : BASE_URL;

export default axios.create({
  baseURL: serverEndpoint,
  headers: {
    "Content-Type": "application/json;  charset=utf-8",
    Accept: "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: serverEndpoint,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;  charset=utf-8",
    Accept: "application/json",
  },
});

export const axiosPrivateFile = axios.create({
  baseURL: serverEndpoint,
  headers: { "Content-Type": "multipart/form-data" },
});

export const axiosPrivateGlobal = axios.create({
  baseURL: serverEndpoint,
  headers: { "Content-Type": "application/json" },
});
