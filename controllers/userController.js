const User = require('../models/user'); // 사용자 모듈의 요청
const Host = require('../models/host');

exports.getAllUsers = (req, res, next) => {
    User.find({}, (error, users) => {
        if(error){
            next(error);
        }else{
            req.data = users;
            next();
        }
    });
};
exports.registerUser = (req, res, next) => {
  
  const { u_id, u_pw, u_email, u_PNumber } = req.body;

  const newUser = new User({
    id: u_id,
    pw: u_pw,
    eamil: u_email,
    PhoneNumber: u_PNumber
  });

  // Save the new user to the "userInfo" collection
  
  newUser.save()
  .then(SavedUser => {
    if(SavedUser){
        res.send("save complete");
    }else{
        res.send("not saved");
    }
  })
  .catch(error => {
    if(error){
        next(error);
    }
  });
};

exports.CheckID = async(req, res, next) => {
    const { u_id, h_id } = req.body;
    console.log(u_id);
    console.log(h_id);
    const PromiseUser = await User.findOne({id: u_id});
    const PromiseHost = await Host.findOne({id: h_id});

    Promise.all([PromiseUser, PromiseHost])
        .then(([existingUser, existingHost]) => {
            if(existingUser){
                res.send("exist id");
            }else if(existingHost){
                res.send("exist id");
            }else{
                res.send("not exist");
            }
        })
        .catch(error => {
            if(error){
                next(error);
            }
        });
};



