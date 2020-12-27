const jwt = require('jsonwebtoken');
const express = require('express');
const nodemailer = require('nodemailer');
const transporter = require('../../transporter');

const keys = require('../../config/keys');
const pool = require('../../db');
const { create_email_token } = require('../utils');

const router = express.Router();

// @route   GET api/verify/:token
// @desc    Confirm the user email
// @access  public

router.get('/:id/:email', (req, res) => {
    try{
        const {id, email} = req.params;
        const token = create_email_token(id, email);
        const verify_url = `localhost:3000/api/verify/${token}`;
        console.log(email);

        let mailOptions = {
            from: keys.GMAIL_USER,
            to: email,
            subject: "BookNinja Confirmation Mail",
            html: `Please click on the following url to confirm: <a href='${verify_url}'> ${verify_url} </a>`,
            text: `Please copy-paste the given url to confirm: ${verify_url}`,
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });

        res.json({status: 'success'});
    } catch (err) {
        console.log("Verification Error: ", err);
        res.json(err.message);
    }
});

// @route   GET api/verify/:token
// @desc    Confirm the user email
// @access  public

router.get("/:token", (req, res) => {
    try {
        const { token } = req.params;
        jwt.verify(token, keys.JWT_EMAIL_SECRET, async (err, decoded_token) => {
            if(err) {
                console.log("JWT Error: ", err);
                res.json({err});
            } else {
                const {id, email} = decoded_token;
                const user = await pool.query("UPDATE users\
                                               SET confirmed = $1\
                                               WHERE user_id = $2 AND user_email = $3\
                                               RETURNING *",
                                               [true, id, email]);
                console.log(user.rows);
                res.redirect("/"); 
            }
        })
    } catch (err) {
        console.log("Error: ", err);
        res.json({err});
    }
});

module.exports = router;