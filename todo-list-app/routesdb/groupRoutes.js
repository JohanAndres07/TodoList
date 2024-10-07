const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/groupController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', GroupController.getAllGroups);
router.get('/:id', GroupController.getGroupById);
router.post('/', GroupController.createGroup);
router.put('/:id', GroupController.updateGroup);
router.delete('/:id', GroupController.deleteGroup);
router.get('/:id/tasks', GroupController.getAllTasksInGroup);

module.exports = router;
