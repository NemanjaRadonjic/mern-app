import { create } from "axios";

const accessToken = JSON.parse(window.localStorage.getItem("accessToken"));

export default create({
  baseURL: "http://localhost:4000",
  headers: { Authorization: `Bearer ${accessToken}` },
});
