const keys = require("../config/keys");
const jwt = require('jsonwebtoken');

const create_token = (id) => {
    return jwt.sign({id}, keys.JWT_SECRET, {
        expiresIn: 1*24*60*60
    });
};

const create_email_token = (id, email) => {
    return jwt.sign({id, email}, keys.JWT_EMAIL_SECRET, {
        expiresIn: '1d'
    });
};

module.exports = {create_token, create_email_token};