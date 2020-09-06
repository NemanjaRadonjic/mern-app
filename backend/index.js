const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const uploadRoutes = require("./routes/upload");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/upload", uploadRoutes);

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
