const express = require("express");
const ejs = require("ejs");
const pool = require("../../db");
const { require_auth } = require("../../middleware/jwtMiddleware");

const router = express.Router();

// @route GET user/:user_id/genre/:genre
// @desc Get all the books belonging to a genre
// @access logged-in user

router.get('/:user_id/genre/:genre', async (req, res) => {
    try {
        const {user_id, genre} = req.params;
        const books = await pool.query("SELECT *\
                                  FROM books\
                                  WHERE genre = $1",
                                  [genre.trim()]);

        res.json({books: books.rows});
    } catch (err) {
        console.log("Error: " + err);
        res.json({err});
    }
});

// @route POST user/:user_id/post_review/:book_id
// @desc Post a book review
// @access logged-in user

/*
*   Sample req.body

{
    "review_content": "A really nice book to have.",
    "rating": 3
}

*/

router.post('/:user_id/post_review/:book_id', async (req, res) => {
    try {
        const {user_id, book_id} = req.params;
        const {review_content, rating} = req.body;

        const new_review = await pool.query("INSERT INTO reviews(user_id, book_isbn_10, likes, review_content, rating)\
                                             VALUES ($1, $2, 0, $3, $4)\
                                             RETURNING *",
                                             [user_id, book_id, review_content, rating]);
        
        console.log(new_review);
        res.json({status: 'posted', rev: new_review.rows[0]});
    } catch (err) {
        console.log("Error: " + err);
        res.json({status: 'error', err: err.message});
    }
});


// @route GET user/:user_id/get_book/:book_id
// @desc Send the book view page with comments
// @access logged-in user

router.get("/:user_id/get_book/:book_id", require_auth, async (req, res) => {
    try{
        const {user_id, book_id} = req.params;
        const book_details = await pool.query("SELECT books.book_isbn_10 as book_id, books.title as title, books.description as description,\
                                                    books.pub_date as pub_date, books.genre as genre, authors.author_name as author_name,\
                                                    ROUND(AVG(reviews.rating)) as avg_rating\
                                               FROM books, authors, reviews\
                                               WHERE books.author_id = authors.author_id\
                                                    AND books.book_isbn_10 = reviews.book_isbn_10\
                                                    AND books.book_isbn_10 = $1\
                                               GROUP BY book_id, author_name\
                                               LIMIT 1",
                                               [book_id]);
        const book_reviews = await pool.query("SELECT users.user_name as user_name, reviews.likes as likes, reviews.review_content as review_content,\
                                                    reviews.post_date as post_date, ROUND(rating) as rating\
                                               FROM reviews, users\
                                               WHERE book_isbn_10 = $1\
                                                    AND reviews.user_id = users.user_id\
                                               ORDER BY post_date DESC",
                                               [book_id]);

        const user_own_reviews = await pool.query("SELECT user_id, book_isbn_10\
                                             FROM reviews\
                                             WHERE book_isbn_10 = $1\
                                                    AND user_id = $2",
                                             [book_id, user_id]);

        let can_review = false;
        if(user_own_reviews.rowCount === 0){
            can_review = true;
        }

        res.render('book_view', {details: book_details.rows[0], reviews: book_reviews.rows, can_review});
    } catch (err) {
        console.log("Error: ", err.message);
        res.json({err: err.message});
    }
});

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