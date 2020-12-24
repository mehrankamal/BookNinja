const express = require("express");
const cors = require("cors");
const fs = require("fs");

const pool = require("./db");
const user = require("./routes/api/user");
// const login_view = require("./routes/view/login");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.use("/public", express.static('public'));

//Views
// app.use("/login", )

//Routes
app.use("/api/user", user);


app.get("/", (req, res) => {
  res.render("login_signup");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});