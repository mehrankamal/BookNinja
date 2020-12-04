const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../../db");

const router = express.Router();
const saltRounds = 10;

// @route   POST api/user
// @desc    Signup user
// @access  public

router.post("/", async (req, res) => {
  try {
    const { user_name, user_pass, user_email, user_bio } = req.body;
    const pass_hash = await bcrypt.hash(user_pass, saltRounds);
    const newUser = await pool.query(
      "INSERT INTO Users (user_name, user_pass, user_email, user_bio, num_followers, num_following) \
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user_name, pass_hash, user_email, user_bio, 0, 0]
    );
    res.json({ status: "success" });
  } catch (err) {
    console.error(err.message);
  }
});

// @route   GET api/user
// @desc    Login user
// @access  public

router.get("/", async (req, res) => {
  try {
    const { user_email, user_pass } = req.body;
    const user = await pool.query(
      "SELECT user_name, user_pass FROM Users WHERE user_email = $1",
      [user_email]
    );
    if (user.length === 0) {
      res.json({ status: "invalid" });
    } else {
      if (await bcrypt.compare(user_pass, user.rows[0].user_pass))
        res.json({ status: "valid" });
      else
        res.json({ status: "invalid" });
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
