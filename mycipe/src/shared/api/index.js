import axios from "axios";
import { getToken } from "../utils";

const api = axios.create({
  baseURL: "http://jhhong0930.shop",
});

// interceptors
api.interceptors.request.use(
  async (config) => {
    config.headers["content-type"] = "application/json; charset=utf-8";
    config.headers["Accept"] = "*/*";
    config.headers["authorization"] = await getToken();
    console.log(config);
    return config;
  },
  async (error) => {
    console.log("에러발생", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    console.log("에러발생 ", error);
    return Promise.reject(error);
  }
);

export default api;
