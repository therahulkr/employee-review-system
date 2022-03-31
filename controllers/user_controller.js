const { findOne } = require('../models/user');
const User = require('../models/user');
const Request = require('../models/request');
const Review = require('../models/review');
// const review = require('../models/review');

// login 
exports.loginUser = async(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return   res.render('login', {
        title: 'Login'
    })
}

// page to show after login
exports.session = async(req,res)=>{
    return res.redirect('/users/profile');
}

// logout a user
module.exports.destroysession = (req,res)=>{
    req.logout();//funcn given to req by passportjs
    return res.redirect('/users/login');
}


// displaying of user profile
exports.profile = async(req,res) => {

    if(req.user.isadmin){
        return res.render('profile',{
            title:"profile-page"
        })
    }
    
    let reqsts = await Request.find();
    let myrqst = [];
    var i = 0;
    // console.log(reqsts.length);
    for(rqst of reqsts){
        // console.log(typeof(rqst.requestTo)+" "+typeof(req.user._id)+" "+i);
        if(rqst.requestTo!==undefined&&rqst.requestTo.toString() === req.user._id.toString()){
            let temp = {
                requestfor : rqst.requestFor,
                requestId : rqst._id
            };
             myrqst[i++] = temp;
        }
    }

    let users = await User.find();
    let reviews = await Review.find();
    let myreviews = [];
    i=0;
    for(review of reviews){
        // console.log(typeof(rqst.requestTo)+" "+typeof(req.user._id)+" "+i);
        if(review.for._id.toString() === req.user._id.toString()){
            let fromuser = await User.findById(review.from);
            // console.log(fromuser);
            let temp = {
                message : review.message,
                from : fromuser.name
            }
            myreviews[i++] = temp;
            // console.log(temp);
        }
    }
    
    return res.render('profile',{
        title:"profile-page",
        rlist : myrqst,
        allusers : users,
        allreviews : myreviews
    })
}






