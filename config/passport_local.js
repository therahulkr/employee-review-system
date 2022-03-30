// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/user');

// module.exports.initialisePassport = (passport)=>{
//       passport.use(
//           new LocalStrategy(async(username,password,done)=>{
//               try {
//                 const user = await User.findOne({username});
//                 if(!user) return done(null,false);
//                 if(user.password!==password) return done(null,false);
//                 return done(null,user);
//               } 
//               catch (error) {
//                 return done(error,false);
//               }
//           })
//       );
//       passport.serializeUser(async(user,done)=>{
//           done(null,user.id);
//       });

//       passport.deserializeUser(async(id,done)=>{
//           try {
//               const user = await User.findById(id);
//               done(null,user);
//           } catch (error) {
//               done(error,false);
//           }
//       })
// }

const passport = require('passport')
const LocalStrat = require('passport-local').Strategy

const User = require('../models/user')

//authentication using passport
passport.use(new LocalStrat({usernameField:'email',passReqToCallback:true },

          (req,email,password,done)=>{
          
              User.findOne({email:email},(err,usr)=>{
                console.log(usr);
                  if(err){
                    //   req.flash('error',err)
                      return ;
                  }
                  if(!usr || usr.password!=password){
                    //   req.flash('error','Invalid UserName/Password')
                      return done(null,false);
                  }
                  return done(null,usr);
              });
          }
    ));

    //serializing the user to decide which key is to be kept in the cookies
    passport.serializeUser((usr,done)=>{
         done(null,usr.id)
    })

    //deserializing the user from the key in the cookies
    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,usr)=>{
            if(err){
                console.log('error in finding user => Passport')
                return done(err);
            }
            return done(null,usr)
        });
    });

    passport.checkAuthentication = (req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/users/login');
    }

    passport.setAuthenticatedUser = (req,res,next)=>{
        if(req.isAuthenticated()){
            res.locals.user = req.user;
        }
        return next();
    }

    module.exports = passport;