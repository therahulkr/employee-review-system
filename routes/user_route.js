const express = require('express');
const { loginUser, session, profile, destroysession } = require('../controllers/user_controller');

const passport = require('passport');
const router = express.Router();

console.log("user router loaded")

router.route('/login').get(loginUser);

router.route('/logout').get(destroysession);

router.route('/session').post(passport.authenticate("local",{failureRedirect:'/users/login'}),session);
router.route('/profile').get(passport.checkAuthentication,profile);



// router.route('/logout').get(loginUser);
// router.get('/login',loginUser);
// router.get('/profile/:id',passport.checkAuthentication,user.profile);



module.exports = router;