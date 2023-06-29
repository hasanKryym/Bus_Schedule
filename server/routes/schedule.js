const express = require('express');
const router = express.Router();
const {getSchedule, addSchedule, registerSchedule, removeRegisterSchedule, getRegisteredSchedule, getDays, morningAfternoonSchedule, deleteSchedule, } = require('../controller/schedule');
const checkAdmin = require('../middleware/checkAdmin');

router.route('/').get(getSchedule).post(checkAdmin, addSchedule);
router.route('/:id').delete(checkAdmin, deleteSchedule);
router.route('/getDays').get(checkAdmin, getDays);
router.route('/registration/:id').get(getRegisteredSchedule).post(registerSchedule).delete(removeRegisterSchedule);
router.route('/morning_afternoon_schedule').post(checkAdmin, morningAfternoonSchedule);
module.exports = router;