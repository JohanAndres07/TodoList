const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const AdminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/all-users-tasks',
    authMiddleware,
    roleMiddleware('admin'),
    TaskController.getAllTasksForAdmin
);

router.post('/assign-role',
    authMiddleware,
    roleMiddleware('admin'),
    AdminController.assignRole
);

module.exports = router;
