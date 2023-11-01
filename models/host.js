const mongoose = require('mongoose'),
    hostSchema = new mongoose.Schema({
        id: {
            type: String,
            unique: true // 중복 방지를 위해 unique 설정
        },
        pw: String,
        email: String,
        PhoneNumber: String,
        category: String,
        location: String
    });

module.exports = mongoose.model("hostinfos", hostSchema);

