const pool = require('../db/connect');

const checkAdmin = async (req, res, next) => {
    try {
        const user_id = req.user;
        const user = await pool.query('SELECT is_admin FROM users WHERE user_id = $1',[user_id]);
        
        if(user.rows.length !== 0) {
            if (user.rows[0].is_admin) 
            next();
            else 
            return res.status(403).json({msg: 'admin only have access to this page'});
        }
        else
        res.status(404).json({success: false, msg: 'no User found'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Error'});
    }
}

module.exports = checkAdmin;