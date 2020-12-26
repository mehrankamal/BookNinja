const express = require("express");
const cors = require("cors");
const cookerParser = require("cookie-parser");
const bodyParser = require("body-parser");

const pool = require("./db");
const user_api_routes = require("./routes/api/user");
const user_view_routes = require("./routes/views/user");
const { check_user } = require("./middleware/jwtMiddleware");


const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(cookerParser());
app.use(check_user);


//API Routes
app.use("/api/user", user_api_routes);

//Views Routes
app.use("/user", user_view_routes);
app.get("/", (req, res) => {
    res.render("login_signup");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
