const User = require('../models/user');

// to create a user
exports.create = async(req,res)=>{
    try {
     const {password,confirm_password} = req.body;
     let user = await User.findOne({email:req.body.email});
     if(user){
              return res.render('NotaUser',{
                  title:"Not valid",
                  message : "User already exist with this email id."
              })
     }
     if(password!=confirm_password){
             return res.render('NotaUser',{
                 title:"Not valid",
                 message : "Confirm password does'not match."
             })
     }
     await User.create({
         name : req.body.name,
         email : req.body.email,
         password : req.body.password,
         isadmin : false
     });
     return res.redirect('/admin/register');
    } 
    catch (error) {
        console.log(error);
    }
 }

//  register page rendering
exports.registerUser = async(req,res)=>{
    return   res.render('register', {
        title: 'Register'
    })
}

// get the all user for admin
exports.allUsers = async(req,res)=>{
    let users = await User.find();
    return res.render('listofusers',{
        title:"All Users",
        allusers : users
    })
}

// get all user to assign work
exports.alluserforwork = async(req,res)=>{
    let users = await User.find();
    return res.render('work',{
        title:"Assign work",
        allusers : users
    })
}

// to remove a user 
exports.deleteOne = async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

// to make user from employee to admin
exports.changeRoles = async(req,res)=>{
    let user = await User.findById(req.params.id);
    user.isadmin = !user.isadmin;
    await User.findByIdAndUpdate(req.params.id,user);
    return res.redirect('back');
}