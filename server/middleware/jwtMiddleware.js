const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const pool = require("../db");

const require_auth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, keys.JWT_SECRET, (err, decoded_token) => {
            if(err){
                console.log(err.message);
                res.redirect('/');
            }else{
                next();
            }
        })
    }else {
        res.redirect('/');
    }
};

const check_user = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, keys.JWT_SECRET, async (err, decoded_token) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                const user = await pool.query("SELECT *\
                                               FROM users\
                                               WHERE user_id = $1",
                                               [decoded_token.id]);
                res.locals.user = user.rows[0];
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {require_auth, check_user};