const express = require("express");
const cors = require("cors");
const cookerParser = require("cookie-parser");

const pool = require("./db");
const user_api_routes = require("./routes/api/user");
const user_view_routes = require("./routes/views/user");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
const bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(cookerParser());

//API Routes
app.use("/api/user", user_api_routes);

//Views Routes
app.get("/", (req, res) => {
    res.render("login_signup");
});
app.get("/user", user_view_routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
