import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = "http://localhost:3001";
axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    console.log("origin", origin);
    const allowedOrigins = [apiUrl];
    const token = Cookies.get("token");
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const api = {
  apiUrl,
  axios,
};

export default api;
