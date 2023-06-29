const pool = require('../db/connect');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users ORDER BY user_name');
        if(users.rows.length !== 0)
        res.status(200).json(users.rows)
        else 
        res.status(200).json({msg: 'no users available'});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg: 'Error'});
    }
    
};

const getUser = async (req, res) => {
    try {
        const { id: user_id } = req.params;
        const user = await pool.query('SELECT * FROM users WHERE user_id = $1',[user_id]);
        if(user.rows.length !== 0) 
        res.status(200).json(user.rows);
        else 
        res.status(404).json({msg: 'user not found'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Error'});
    }
};

const addUser = async (req, res) => {
    try {
        const { user_name, user_email, user_password, user_number, is_admin } = req.body;
        
        if(user_name && user_email && user_password && user_number) {
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(user_password, salt);

            const addUser = await pool.query('INSERT INTO users(user_name, user_email, user_password, user_number, is_admin ) VALUES($1, $2, $3, $4, $5)',[user_name,user_email, bcryptPassword, user_number, is_admin]);

            res.status(200).json({success: true, msg: 'user added successfully'});
        }
        else
        res.status(500).json({success: false, msg: 'Please provide user_name and user_number'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Error'});
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id: user_id } = req.params;
        const user = await pool.query('SELECT user_name FROM users WHERE user_id = $1',[user_id]);
        if(user.rows.length !== 0){
            removeUser = await pool.query('DELETE FROM users WHERE user_id = $1',[user_id]);
            res.status(200).json({success: true, msg: 'user deleted successfully'});
        }
        else {
            res.status(404).json({success: false, msg: 'user not found'});
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Error'});
    }
}

const updateUser = async (req, res) => {
    try {
        const { id: user_id } = req.params;

        const { user_name, user_password, user_number } = req.body;
        
        if(user_name && user_password && user_number) {
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(user_password, salt);

            const updateUser = pool.query('UPDATE users SET user_name = $1, user_password = $2, user_number = $3 WHERE user_id = $4',[user_name, bcryptPassword, user_number, user_id]);

            return res.status(200).json({success: true, msg: 'user updated successfully'})
        }
        else 
        return res.status(401).json({success: false, msg: 'please provide all inputs'});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Error'});
    }
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
}