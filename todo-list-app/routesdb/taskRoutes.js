const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', TaskController.getAllTasks);
router.get('/:id', TaskController.getTaskById);
router.get('/filter', TaskController.getFilteredTasks);
router.get('/paginated', TaskController.getAllTasksPaginated);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.patch('/:id', TaskController.patchTask);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;
