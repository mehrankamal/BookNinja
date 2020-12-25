const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const require_auth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, keys.JWT_SECRET, (err, decoded_token) => {
            if(err){
                console.log(err.message);
                res.redirect('/');
            }else{
                console.log(decoded_token);
                next();
            }
        })
    }else {
        res.redirect('/');
    }
};

module.exports = {require_auth};