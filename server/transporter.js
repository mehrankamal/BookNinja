const nodemailer = require('nodemailer');
const keys = require('./config/keys');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: keys.GMAIL_USER,
        pass: keys.GMAIL_PASS
    },
});

module.exports = transporter;