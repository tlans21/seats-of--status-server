const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const option = require('../config/option');
dotenv.config();

const createAccessToken = (email, success) => {
    const payload = { email, success };
    return jwt.sign(payload, process.env.ACCESS_SECRET, option.option);
};

const createRefreshToken = (email, success) => {
    const payload = { email, success };
    return jwt.sign(payload, process.env.REFRESH_SECRET, option.option2);
};

const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
};

module.exports = {createAccessToken, createRefreshToken, verifyToken};