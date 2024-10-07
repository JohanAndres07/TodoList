const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/profile', authMiddleware, UserController.getUserProfile);

router.delete('/:id',
    authMiddleware,
    roleMiddleware('admin'),
    UserController.deleteUser
);

module.exports = router;
