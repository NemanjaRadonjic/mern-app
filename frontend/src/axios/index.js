import { create } from "axios";
import store from "../index";
import { logout } from "@actions/userActions";
import { toast } from "react-toastify";

const axiosInstance = create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      if (
        error.response?.data.expiredAt ||
        error.response?.data.message === "jwt malformed"
      ) {
        const originalRequest = error.config;
        const userData = JSON.parse(window.localStorage.getItem("user"));
        const response = await axiosInstance.post("/auth/refresh_token", {
          userData,
        });

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
