const express = require('express');
const { getUsersSchedule } = require('../controller/adminPanel');
const checkAdmin = require('../middleware/checkAdmin');
const router = express.Router();


router.route('/getUsersSchedule').post(getUsersSchedule)


module.exports = router;