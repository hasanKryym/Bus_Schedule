const express = require('express');
const pool = require('../db/connect');
const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const user_id = req.user;
        const is_admin = await pool.query('SELECT is_admin FROM users WHERE user_id = $1',[user_id]);
        res.status(200).json(is_admin.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Error'});
    }
})

module.exports = router;