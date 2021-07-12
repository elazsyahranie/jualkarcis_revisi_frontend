import axios from "axios";

const axiosApiIntances = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// axios interceptor

export default axiosApiIntances;
