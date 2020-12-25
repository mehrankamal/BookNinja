const express = require('express');
const pool = require('../../db');

const router = express.Router();

// @route GET user/:id/
// @desc Send the user profile view
// @access logged-in user

router.get("/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        console.log(user_id);

        const user = await pool.query(
            "SELECT * FROM users WHERE user_id = $1",
            [user_id]
        );

        const num_followers = await pool.query(
            "SELECT COUNT(*) AS num_followers\
                                            FROM user_follows\
                                            WHERE user_id = $1",
            [user_id]
        );
        const num_following = await pool.query(
            "SELECT COUNT(*) AS num_following\
                                            FROM user_follows\
                                            WHERE following_id = $1",
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
                num_followers: num_followers.rows[0].num_followers,
                num_following: num_followers.rows[0].num_following,
            },
            shelves: shelves.rows,
        };

        console.log(user_details);

        res.render("user_profile", { user_details });
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;