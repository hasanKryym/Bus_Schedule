const pool = require('../db/connect');

const getSchedule = async (req, res) => {
  try {
    const schedlues = await pool.query(
      'SELECT * FROM schedule ORDER BY schedule_day, schedule_time'
    );
    res.status(200).json(schedlues.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error' });
  }
};

const addSchedule = async (req, res) => {
  try {
    const { schedule_time, schedule_day } = req.body;

    if (schedule_day && schedule_time) {
      const checkTime = await pool.query(
        'SELECT * FROM schedule WHERE schedule_time = $1 AND schedule_day = $2',
        [schedule_time, schedule_day]
      );

      if (checkTime.rows.length === 0) {
        const add = await pool.query(
          'INSERT INTO schedule (schedule_time, schedule_day) VALUES($1,$2)',
          [schedule_time, schedule_day]
        );
        return res
          .status(200)
          .json({ success: true, msg: 'schedule added successfully' });
      } else {
        return res
          .status(500)
          .json({ success: false, msg: 'schedule already exists' });
      }
    }

    res.status(500).json({ success: false, msg: 'please provide inputs' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error' });
  }
};

const registerSchedule = async (req, res) => {
  try {
    const { id: user_id } = req.params;
    const { schedule_id } = req.body;

    if (user_id && schedule_id) {
      let allowRegister = true;

      let registeredSchedules = await pool.query(
        'SELECT schedule_time, schedule_day FROM schedule WHERE schedule_id IN (SELECT schedule_id FROM registration WHERE user_id = $1)',
        [user_id]
      );

      registeredSchedules = registeredSchedules.rows;
      if (registeredSchedules.length === 0) {
        const query = await pool.query(
          'INSERT INTO registration VALUES ($1, $2)',
          [user_id, schedule_id]
        );
        return res.status(200).json({ success: true });
      } else {
        let requestedSchedule = await pool.query(
          'SELECT schedule_time, schedule_day FROM schedule WHERE schedule_id = $1',
          [schedule_id]
        );
        requestedSchedule = requestedSchedule.rows[0];
        // +requestedSchedule.schedule_time.slice(0,2) < 12
        registeredSchedules.map((schedule) => {
          const timeCheck =
            (+requestedSchedule.schedule_time.slice(0, 2) < 12 &&
              +schedule.schedule_time.slice(0, 2) < 12) ||
            (+requestedSchedule.schedule_time.slice(0, 2) >= 12 &&
              +schedule.schedule_time.slice(0, 2) >= 12);
          if (
            requestedSchedule.schedule_day === schedule.schedule_day &&
            timeCheck
          ) {
            allowRegister = false;
            return;
          }
        });

        if (allowRegister) {
          const query = await pool.query(
            'INSERT INTO registration VALUES ($1, $2)',
            [user_id, schedule_id]
          );
          return res.status(200).json({ success: true });
        } else {
          return res.json({
            success: false,
            msg: 'cant register in morning/afternoon time twice',
          });
        }
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error' });
  }
};

const removeRegisterSchedule = async (req, res) => {
  try {
    const { id: user_id } = req.params;
    const { schedule_id } = req.body;
    if (user_id && schedule_id) {
      const remove = await pool.query(
        'DELETE FROM registration WHERE user_id = $1 AND schedule_id = $2',
        [user_id, schedule_id]
      );
      return res.status(200).json({ success: true });
    }

    res.json({ success: false });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error' });
  }
};

const getRegisteredSchedule = async (req, res) => {
  try {
    const { id: user_id } = req.params;
    const getSchedule = await pool.query(
      'SELECT schedule_id FROM registration WHERE user_id = $1',
      [user_id]
    );
    return res.status(200).json(getSchedule.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error' });
  }
};

const getDays = async (req, res) => {
  try {
    const getDays = await pool.query(
      'SELECT DISTINCT schedule_day FROM schedule'
    );
    return res.status(200).json(getDays.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error' });
  }
};

const morningAfternoonSchedule = async (req, res) => {
  try {
    const { schedule_day, time } = req.body;
    if (time === 'Morning') {
      const morningTime = await pool.query(
        "SELECT schedule_time FROM schedule WHERE schedule_day = $1 AND schedule_time BETWEEN '6:00:00' AND '12:00:00'",
        [schedule_day]
      );

      return res.status(200).json(morningTime.rows);
    } else {
      const morningTime = await pool.query(
        "SELECT schedule_time FROM schedule WHERE schedule_day = $1 AND schedule_time BETWEEN '12:00:00' AND '20:00:00'",
        [schedule_day]
      );

      return res.status(200).json(morningTime.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error' });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id: schedule_id } = req.params;
    const deleteSchedule = await pool.query(
      'DELETE FROM schedule where schedule_id = $1',
      [schedule_id]
    );
    res
      .status(200)
      .json({ success: true, msg: 'schedule deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error' });
  }
};

module.exports = {
  getSchedule,
  addSchedule,
  registerSchedule,
  removeRegisterSchedule,
  getRegisteredSchedule,
  getDays,
  morningAfternoonSchedule,
  deleteSchedule,
};
