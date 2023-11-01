const mongoose = require('mongoose');


const BoardSchema = new mongoose.Schema({
    BoardNumber: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      comments: [{
        text: {
          type: String,
          required: true
        },
        author: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }]
});

module.exports = mongoose.model("Boardinfos", BoardSchema);