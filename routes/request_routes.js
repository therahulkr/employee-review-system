const express = require('express');
const { createRequest } = require('../controllers/request_controller');
const router = express.Router();


router.route('/create').post(createRequest);



module.exports = router;