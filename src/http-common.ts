import axios from "axios";
const axiosInstance=  axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});
axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
export default axiosInstance;