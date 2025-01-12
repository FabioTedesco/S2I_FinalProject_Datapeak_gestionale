import API from "./api";
import axios from "axios";
import store from "../store/store";

const privateAxios = axios.create({
  baseURL: "http://localhost/Be/controllers",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor per le risposte
privateAxios.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login
export const login = (username, password_hash) =>
  API.post("/auth/login.php", { username, password_hash });

//Auth
export const auth = async () => {
  const response = await privateAxios.get("/auth/authenticate.php");
  return response.data;
};

//getAllUsers
export const getAllUsers = () => API.get("/auth/getAll.php");

//createUser
export const createUser = (user) => API.post("/auth/createUser.php", user);

//deleteUser
export const deleteUser = (id) =>
  API.delete(`/auth/deleteUser.php`, { data: { id } });
