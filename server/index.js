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
app.set('view engine', 'ejs');
app.use("/public", express.static('public'));

//Views
// app.use("/login", )

//Routes
app.use("/api/user", user);

//Views
app.get("/", (req, res) => {
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

    const num_followers = await pool.query("SELECT COUNT(*) AS num_followers\
                                            FROM user_follows\
                                            WHERE user_id = $1",
                                            [user_id]);
    const num_following = await pool.query("SELECT COUNT(*) AS num_following\
                                            FROM user_follows\
                                            WHERE following_id = $1",
                                            [user_id]);

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
        num_followers: num_followers.rows[0].num_followers,
        num_following: num_followers.rows[0].num_following,
      },
      shelves:
        [shelves.rows]
    };
    
    console.log(user_details);

    res.render("user_profile", {user_details});
  } catch (err) {
    console.log(err.message); 
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});