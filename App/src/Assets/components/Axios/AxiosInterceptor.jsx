import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.REACT_APP_CLIENT_URL
  }
});

// request interceptor
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data.error.message;

      if (errorMessage === "jwt expired" && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/auth/refresh-token`,
            {
              refreshToken: localStorage.getItem("refreshToken"),
            }
          );

          localStorage.setItem("accessToken", data.newAccessToken);
          localStorage.setItem("refreshToken", data.newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${data.newAccessToken}`;
          return API(originalRequest);
        } catch (refreshError) {
          console.error(
            "Refresh token failed - response interceptor",
            refreshError
          );
          if (!window.location.pathname.includes("/")) {
            window.location.href = "/";
          }
          return Promise.reject(refreshError);
        }
      } else if (errorMessage === "Session expired") {
        localStorage.clear();

        alert("Another device logged in with your credentials!");
        if (!window.location.pathname.includes("/")) {
          window.location.href = "/";
        }

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default API;