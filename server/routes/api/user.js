const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../../db");
const {create_token} = require("../utils");
const {require_auth} = require("../../middleware/jwtMiddleware");

const router = express.Router();
const saltRounds = 10;

// @route   PUT api/user/:user_id/edit_bio
// @desc    Edit bio of a user
// @access  private (user can edit his own bio)

router.put('/:user_id/edit_bio', require_auth, async (req, res) => {
    try {
        const {user_bio} = req.body;
        const {user_id} = req.params;

        console.log(user_bio + user_id);
        const edited_record = await pool.query("UPDATE users\
                                          SET user_bio = $1\
                                          WHERE user_id = $2\
                                          RETURNING user_bio",
                                          [user_bio, user_id]);
        res.status(200).json({status: "success", user_bio});
    } catch (err) {
        console.log("Error: " + err);
        res.status(400).json({status: "unsuccessful"});
    }
});

// @route   PUT api/user/:user_id/edit_name
// @desc    Edit name of a user
// @access  private (user can add shelf into his own account)

router.put('/:user_id/edit_name', require_auth, async (req, res) => {
    try {
        const {user_id} = req.params;
        const {user_name} = req.body;

        const edited_record = await pool.query("UPDATE users\
                                                SET user_name = $1\
                                                WHERE user_id = $2\
                                                RETURNING user_name",
                                                [user_name, user_id]);
        res.status(200).json({status: "success", user_name});
    } catch (err) {
        console.log("Error: " + err);
        res.status(400).json({status: 'unsuccessful'});
    }
});

// @route   POST api/user/:user_id/add_shelf
// @desc    Add a new shelf against an user given shelf name
// @access  private (user can add shelf into his own account)


//{
// shelf_name: "Example shelf"
//}

router.post("/:user_id/add_shelf", require_auth, async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        const {user_id} = req.params;
        const {shelf_name} = req.body;

        const new_shelf = await pool.query("INSERT INTO user_shelf(user_id, shelf_name)\
                                            VALUES ($1, $2)\
                                            RETURNING shelf_id",
                                            [user_id, shelf_name]);
        if(new_shelf.rowCount !== 0){
            res.json({status: "inserted shelf", shelf_id: new_shelf.rows[0].shelf_id});
        } else {
            res.json({status: "error adding shelf"});
        }

    } catch (err) {
        console.log("Error: " + err);
    }
});

// @route   DELETE api/user/:user_id/delete_shelf/:shelf_id/:book_id
// @desc    Delete a book related to a shelf
// @access  private (user can delete only it's related books from a shelf)

router.delete("/:user_id/delete_book/:shelf_id/:book_id", require_auth, async (req, res) => {
    try {
        const {user_id, shelf_id, book_id} = req.params;
        const deletedBook = await pool.query("DELETE FROM shelf_books\
                                              WHERE shelf_id = $1 AND book_isbn_10 = $2",
                                              [parseInt(shelf_id), book_id]);
        res.status(200);
        res.end();

    } catch (err) {
        console.log("Error "+ err.message);
        res.json({err});
    }
});

// @route   DELETE api/user/:user_id/delete_shelf/:shelf_id
// @desc    Delete a shelf related to a user
// @access  private (user can delete only it's related shelves)

router.delete("/:user_id/delete_shelf/:shelf_id", require_auth, async (req, res) => {
    try {
        const {shelf_id, user_id} = req.params;

        const deletedShelf = await pool.query("DELETE FROM user_shelf\
                                               WHERE shelf_id = $1 AND user_id = $2\
                                               RETURNING *",
                                               [parseInt(shelf_id), parseInt(user_id)]);

        res.status(200);
        res.end();
    } catch (err) {
        console.log("Error: " + err);
        res.json({err});
    }
});


// @route   POST api/user/signup
// @desc    Signup user
// @access  public

router.post("/signup", async (req, res) => {
    try {
        const { user_name, user_pass, user_email } = req.body;
        const pass_hash = await bcrypt.hash(user_pass, saltRounds);
        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_pass, user_email) \
             VALUES ($1, $2, $3) RETURNING user_id",
            [user_name, pass_hash, user_email]
        );
        const token = create_token(newUser.rows[0].user_id);

        res.redirect(`/api/verify/${newUser.rows[0].user_id}/${user_email}`);
    } catch (err) {
        if (err.constraint === "users_user_email_key")
            res.json({ status: "user already exists" });
        else{
            console.log("Error: " + err);
            res.json({err});
        }
    }
});

// @route   POST api/user/signin
// @desc    Login user
// @access  public

router.post("/signin", async (req, res) => {
    try {
        const { user_email, user_pass } = req.body;

        const user = await pool.query(
            "SELECT user_id, user_name, user_pass,confirmed FROM Users WHERE user_email = $1",
            [user_email]
        );

        if (user.rowCount === 0) {
            res.json({ status: "invalid" });
        } else {
            if (await bcrypt.compare(user_pass, user.rows[0].user_pass)) {
                const token = create_token(user.rows[0].user_id);
                res.cookie("jwt", token, {httpOnly: true, maxAge: 1000 * 1 * 60 * 60 * 24});
                res.status(200).json({ status: "valid", user_id: user.rows[0].user_id, confirmed: user.rows[0].confirmed });
            } else res.json({ status: "invalid" });
        }
    } catch (err) {
        console.error("Error: " + err);
        res.status(400).end();
    }
});

module.exports = router;
