const User = require('../models/user');
const Review = require('../models/review');
const Request = require('../models/request');
const { default: mongoose } = require('mongoose');

// assign of review from one employee to another
exports.assignReview = async(req,res)=>{
    // console.log(req.body);
    let find = mongoose.Types.ObjectId(req.body.recieverId);
    let delreq = mongoose.Types.ObjectId(req.body.deletethisrequest);

    let review = {
        message : req.body.message,
        rating : req.body.rating,
        from : req.user._id,
        for : find
    }

    let addedreview = await Review.create(review);
    await Request.findByIdAndDelete(delreq);
    // let rec = await User.findById(find);
    // console.log(rec);
    // let len = rec.reviews.length;
    // console.log(len);
    // rec.reviews[len] = addedreview._id;

    // console.log(rec);
    
    return res.redirect('back');
}