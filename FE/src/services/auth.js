import axios from "axios";
import store from "../store/store";

const privateAxios = axios.create({
  baseURL:
    "http://s2ifinalprojectdatapeakgestio-production.up.railway.app/controllers",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor per le risposte
privateAxios.interceptors.request.use((config) => {
  console.log("Request URL:", config.baseURL + config.url);
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login
export const login = (username, password_hash) =>
  privateAxios.post("/auth/login.php", { username, password_hash });

//Auth
export const auth = async () => {
  const response = await privateAxios.get("/auth/authenticate.php");
  return response.data;
};

//getAllUsers
export const getAllUsers = () => privateAxios.get("/auth/getAll.php");

//createUser
export const createUser = (user) =>
  privateAxios.post("/auth/createUser.php", user);

//deleteUser
export const deleteUser = (id) =>
  privateAxios.delete(`/auth/deleteUser.php`, { data: { id } });
