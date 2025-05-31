import axios from "axios";
export const DOMAIN: string = "http://localhost:8080";
export const ACCESS_TOKEN: string = "token";

const axiosClient = axios.create({
  baseURL: DOMAIN, 
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000, 
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // const token = localStore.get("token");

    // if (token) {
    //   config.headers.token = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 404) {
      console.log("Resource not found!");
    }

    if (status === 401 || status === 403) {
      console.log("Unauthorized - Redirecting to login");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;