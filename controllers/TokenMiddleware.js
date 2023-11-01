const jwt = require('jsonwebtoken');
const secretkey = require('../config/option');
const dotenv = require('dotenv');
const { createAccessToken, createRefreshToken, verifyToken } = require('./tokenUtils.js');
dotenv.config();

const tokenCheck = async (req, res, next) => {
    var {accessToken, refreshToken} = req.cookies
    
    console.log(accessToken);
    console.log(refreshToken);
    if(!accessToken){
        console.log("accessToken이 만료됨");
    }

    if(!refreshToken){
        console.log("refreshToken이 만료");
        res.status(500).json("refreshToken is not found");       
    }
    // 디코딩
    // 시크릿키

    const accessSecret = process.env.ACCESS_SECRET;
    const refreshSecret = process.env.REFRESH_SECRET;
    // console.log(accessSecret);
    // console.log(refreshSecret);

    try{
        const accessTokenPayload = verifyToken(accessToken, accessSecret);
        console.log(accessTokenPayload);
        
        if(!accessTokenPayload){
            const refreshTokenPayload = verifyToken(refreshToken, refreshSecret);
            console.log(refreshTokenPayload);   
            if(!refreshTokenPayload){
                return res.status(500).json("refreshToken is expired");
            }

            const {email, success} = refreshTokenPayload;
            var newAccessToken = createAccessToken(email, success);
            accessToken = newAccessToken;

            req.email = email;
            res.cookie("accessToken", accessToken);
            res.cookie("refreshToken", refreshToken);
        }
        if(accessTokenPayload){
            req.email = accessTokenPayload.email;
        }
        next();
    }catch(err){
        next(err);
    }    
}

module.exports = { tokenCheck };