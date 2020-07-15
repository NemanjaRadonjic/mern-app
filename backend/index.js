const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.get("/users", async (req, res) => {
  res.json({ message: "response" });
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
