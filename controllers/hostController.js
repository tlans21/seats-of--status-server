const Host = require('../models/host');




exports.registerHost = (req, res, next) => {
    const { h_id, h_pw, h_email, h_Category} = req.body;
    console.log(h_id, h_pw, h_email, h_Category)
    
    const newHost = new Host({
        id: h_id,
        pw: h_pw,
        email: h_email,
        category: h_Category,
        location: "충주"
    });

    newHost.save()
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