const keys = require("../config/keys");
const jwt = require('jsonwebtoken');

const create_token = (id) => {
    return jwt.sign({id}, keys.JWT_SECRET, {
        expiresIn: 1*24*60*60
    });
};

module.exports = {create_token};