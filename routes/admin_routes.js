const express = require('express');
const { registerUser, alluserforwork } = require('../controllers/admin_controller');
const {  allUsers, deleteOne, create, changeRoles } = require('../controllers/admin_controller');

const router = express.Router();

router.route('/register').get(registerUser);

router.route('/create').post(create);

router.route('/change/:id').get(changeRoles);

router.route('/delete/:id').get(deleteOne);

router.route('/all').get(allUsers);
router.route('/allforwork').get(alluserforwork);


module.exports = router;