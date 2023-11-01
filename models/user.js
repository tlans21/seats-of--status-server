const mongoose = require('mongoose'),
    userSchema = new mongoose.Schema({
        id: {
            type: String,
            unique: true // 중복 방지를 위해 unique 설정
        },
        pw: String,
        email: String,
        PhoneNumber: String
    });
module.exports = mongoose.model("userinfos", userSchema);

