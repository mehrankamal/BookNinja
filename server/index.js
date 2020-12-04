const express = require("express");
const cors = require("cors");

const pool = require("./db");
const user = require("./routes/api/user");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/user", user);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
