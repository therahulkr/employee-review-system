const User = require('../models/user');
const Request = require('../models/request');

// request is created by admin for employee's
exports.createRequest = async(req,res)=>{
    const newrqst = {
        requestTo:req.body.sender,
        requestFor:req.body.reciever
    }

    await Request.create(newrqst);

    return res.redirect('back');
}