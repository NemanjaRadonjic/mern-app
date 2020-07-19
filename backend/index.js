const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const User = require("./models/User");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.get("/users", async (req, res) => {
  const users = await User.find({});
  return res.json([...users]);
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
