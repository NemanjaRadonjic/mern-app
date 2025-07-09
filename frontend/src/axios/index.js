import { create } from "axios";
import store from "../index";
import { logout } from "@actions/userActions";
import { toast } from "react-toastify";

const isLocal = window.location.hostname === "localhost";

const axiosInstance = create({
  baseURL: isLocal
    ? "http://localhost:4000"
    : process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      if (
        error.response?.data.expiredAt ||
        error.response?.data.message === "jwt malformed" ||
        error.response?.data.message === "Invalid or expired access token"
      ) {
        const originalRequest = error.config;
        const userData = JSON.parse(window.localStorage.getItem("user"));
        const response = await axiosInstance.post("/auth/refresh_token");
        console.log(response);
        if (response) {
          const { accessToken } = response.data;
          if (accessToken) {
            axiosInstance.defaults.headers.authorization =
              "Bearer " + accessToken;
            originalRequest.headers.authorization = "Bearer " + accessToken;
            window.localStorage.setItem(
              "accessToken",
              JSON.stringify(accessToken)
            );
            return await axiosInstance(originalRequest);
          }
        } else {
          window.localStorage.removeItem("user");
          window.localStorage.removeItem("accessToken");
          store.dispatch(logout());
          toast.error("Session expired.");
        }
      }
      if (error.response?.data.accessToken === "") {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("accessToken");
        store.dispatch(logout());
        toast.error("Session expired.");
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
