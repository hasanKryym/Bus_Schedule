const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
} = require('../controller/users');
const checkAdmin = require('../middleware/checkAdmin');

router.route('/').get(checkAdmin, getAllUsers).post(checkAdmin, addUser);
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;