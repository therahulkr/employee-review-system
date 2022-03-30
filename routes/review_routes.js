const express = require('express');
const { assignReview } = require('../controllers/review_controller');
const router = express.Router();


router.route('/assign').post(assignReview);



module.exports = router;