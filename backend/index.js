const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { verify } = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("./jwt");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.post("/refresh_token", (req, res) => {
  const { token } = req.cookies;
  const { userData } = req.body;
  if (!token) {
    return res.json({ accessToken: "" });
  }
  verify(token, process.env.REFRESH_TOKEN_SECRET, (err) => {
    if (err && err.expiredAt) {
      return res.status(403).json({ accessToken: "" });
    }
    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData);
    res.cookie("token", refreshToken);
    return res.json({ accessToken });
  });
});

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log("Server is running at port: ", process.env.PORT)
    )
  )
  .catch((error) => console.log("Unable to connect to MongoDB: ", error));
