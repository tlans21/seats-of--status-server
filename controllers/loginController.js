const User = require('../models/user'),
    Host = require('../models/host');
const options = require('../config/option');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();

exports.login = (req, res) => {
    const{u_id, u_pw, h_id, h_pw} = req.body;
    
    const userPromise = User.findOne({id : u_id});
    const hostPromise = Host.findOne({id : h_id});
   
    const accessSecret = process.env.ACCESS_SECRET;
    const refreshSecret = process.env.REFRESH_SECRET;

    Promise.all([userPromise, hostPromise]) 
        .then(([existingUser, existingHost]) => {
            if(existingUser){
                if(existingUser.pw == u_pw){ 
                    try{
                        //access token 발급
                        const user1 = {
                            email: existingUser.email,
                            success: true                       
                        }
                        const accessToken = jwt.sign(user1, accessSecret, options.option);
                        
                        //refresh token 발급
                        const user2 = {
                            email: existingUser.email,
                            success: true                          
                        }
                        
                        const refreshToken = jwt.sign(user2, refreshSecret, options.option2);
                       
                        res.cookie("accessToken", accessToken, {
                            secure: false,
                            httpOnly: true,
                        });

                        res.cookie("refreshToken", refreshToken, {
                            secure: false,
                            httpOnly: true,
                        });
                        
                        console.log("User transport");
                        res.send("User login");
                        console.log(accessToken);
                        console.log(refreshToken);
                        
                    }catch (error){
                        console.log("error");
                        res.status(404).send("not found")
                    }
                    
                }else{
                    console.log("ps error");
                    res.send("Invaild password");
                }
            }else if(existingHost){
                if(existingHost.pw == h_pw){
                    try{
                        //access token 발급

                        const host1 = {
                            email: existingHost.email,
                            success: true
                        }
                        const accessToken = jwt.sign(host1, accessSecret, options.option);
                        
                        //refresh token
                        const host2 = {
                            email: existingHost.email,
                            success: true
                        }
                        
                        const refreshToekn = jwt.sign(host2, refreshSecret, options.option2); 
                        res.cookie("accessToken", accessToken, {
                            secure: false,
                            httpOnly: true,
                        });

                        res.cookie("refreshToken", refreshToekn, {
                            secure: false,
                            httpOnly: true,
                        });
                        console.log("User transport");
                        res.send("Host login");
                    }catch (error){
                        console.log("error");
                        res.send("error");
                    }
                    
                    
                }else{
                    console.log("ps error");
                    res.send("Invaild password");
                }
            }else{
                console.log("not found");
                res.send("not found");
            }
        })
        .catch(error => {
            if(error){
                next(error);
            }
        });
};

