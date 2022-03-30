const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requestTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
    },
    requestFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
    }
},
{
  timestamps: true,
})

const Request = mongoose.model("Request",requestSchema);
module.exports = Request;