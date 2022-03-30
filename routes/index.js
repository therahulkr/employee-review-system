const express = require('express');
const { homepage } = require('../controllers/home_controller');

const router = express.Router();

console.log("router loaded")
router.route('/').get(homepage);


router.use('/users',require('./user_route'));
router.use('/admin',require('./admin_routes'));
router.use('/request',require('./request_routes'));
router.use('/review',require('./review_routes'));
// router.route('/profile').get(getUserDetails);


module.exports = router;