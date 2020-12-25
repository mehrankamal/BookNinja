const express = require("express");
const ejs = require("ejs");
const pool = require("../../db");
const { require_auth } = require("../../middleware/jwtMiddleware");

const router = express.Router();

// @route GET user/:id/
// @desc Send the user profile view
// @access logged-in user

router.get("/:user_id", require_auth, async (req, res) => {
    try {
        const { user_id } = req.params;

        const user = await pool.query(
            "SELECT * FROM users WHERE user_id = $1",
            [user_id]
        );

        const shelves = await pool.query(
            "SELECT shelf_id, shelf_name\
            FROM user_shelf\
            WHERE user_id = $1",
            [user_id]
        );

        user_details = {
            user: {
                user_name: user.rows[0].user_name,
                user_bio: user.rows[0].user_bio,
                user_email: user.rows[0].user_email,
                user_id: user.rows[0].user_id,
                num_followers: user.rows[0].num_followers,
                num_following: user.rows[0].num_following,
            },
            shelves: shelves.rows,
        };

        res.render("user_profile", { user_details });
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;
