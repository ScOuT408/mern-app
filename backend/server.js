const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;

require("./database/db");

// using json
app.use(express.json());

// routes use
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/goals", require("./routes/goalsRoute"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  console.log(__dirname);

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
  );
}

app.listen(port, () => {
  console.log(`Backend Server is Running! On ${process.env.PORT}`);
});
