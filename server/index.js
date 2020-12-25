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
<<<<<<< HEAD
  res.render("login_signup");
});

app.get("/user/:user_email", async (req, res) => {
  try {
    const { user_email } = req.params;
    console.log(user_email);

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1",
      [user_email]);

    // console.log(user);

    const user_id = user.rows[0].user_id;
    const num_followers = user.rows[0].num_followers;
    const num_following = user.rows[0].num_following;

    // const num_followers = await pool.query("SELECT COUNT(*) AS num_followers\
    //                                         FROM user_follows\
    //                                         WHERE user_id = $1",
    //                                         [user_id]);
    // const num_following = await pool.query("SELECT COUNT(*) AS num_following\
    //                                         FROM user_follows\
    //                                         WHERE following_id = $1",
    //                                         [user_id]);

    const shelves = await pool.query("SELECT shelf_id, shelf_name\
                                      FROM user_shelf\
                                      WHERE user_id = $1",
                                      [user_id]);

    user_details = {
      user: {
        user_name: user.rows[0].user_name,
        user_bio: user.rows[0].user_bio,
        user_email: user.rows[0].user_email,
        user_id: user.rows[0].user_id,
        num_followers: num_followers,
        num_following: num_following,
      },
      shelves:
        shelves.rows
    };
    
    console.log(user_details);

    res.render("user_profile", {user_details});
  } catch (err) {
    console.log(err.message); 
  }
=======
    res.render("login_signup");
>>>>>>> 15eda4ea0fcbb52cfbab1695fd8d053eded605c6
});
app.get("/user", user_view_routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
