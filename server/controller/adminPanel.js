const pool = require('../db/connect');


const getUsersSchedule = async (req, res) => {
    try {
        const {schedule_day, schedule_time} = req.body;
        const users = await pool.query("SELECT user_name, user_number FROM users WHERE user_id IN (SELECT user_id FROM registration WHERE schedule_id IN (SELECT schedule_id FROM schedule WHERE schedule_day = $1 AND schedule_time = $2))",[schedule_day,schedule_time]);
        return res.status(200).json(users.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Error'});
    }

}


module.exports = {getUsersSchedule}