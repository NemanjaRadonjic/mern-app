const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

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
