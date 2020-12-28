const express = require("express");
const ejs = require("ejs");
const pool = require("../../db");
const { require_auth } = require("../../middleware/jwtMiddleware");

const router = express.Router();

// @route GET user/:user_id/
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
                confirmation : user.rows[0].confirmation
            },
            shelves: shelves.rows,
        };

        res.render("user_profile", { user_details });
    } catch (err) {
        console.log("Error" + err.message);
    }
});

// @route GET user/:user_id/logout/
// @desc Logout the user
// @access logged-in user

router.get("/:user_id/logout", require_auth, (req, res) => {
    const {user_id} = req.params;
    res.cookie('jwt', '', {maxAge: 1});
    
    res.end();
});

// @route GET user/:user_id/shelf/:shelf_id
// @desc Get shelf of a user
// @access logged-in user

router.get("/:user_id/shelf/:shelf_id", require_auth,async (req, res) => {
    try {
        const {user_id, shelf_id} = req.params;
        console.log(shelf_id);
        console.log(user_id);
        const books = await pool.query("SELECT user_shelf.shelf_name, books.book_isbn_10, books.title,\
                                         books.description, books.pub_date, books.genre, authors.author_name\
                                        FROM user_shelf, shelf_books, books, authors\
                                        WHERE user_shelf.shelf_id = shelf_books.shelf_id\
                                                AND user_shelf.shelf_id = $1\
                                                AND shelf_books.book_isbn_10 = books.book_isbn_10\
                                                AND books.author_id = authors.author_id\
                                                AND user_shelf.user_id = $2;",
                                        [shelf_id, user_id]);
        console.log(books.rows); 
        res.render("shelf_view", {books: books.rows,shelf_id,user_id,length: books.rowCount});
    } catch (err) {
        console.log("Error: " + err.message);
        res.status(300).json({err: err.message});
    }


});



module.exports = router;