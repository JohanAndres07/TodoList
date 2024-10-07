const UserService = require('../services/userService');

class AdminController {
    async assignRole(req, res) {
        try {
            const { userId, role } = req.body;

            if (!['user', 'admin'].includes(role)) {
                return res.status(400).json({ message: 'Invalid role' });
            }

            const user = await UserService.findUserById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.role = role;
            await user.save();

            res.status(200).json({ message: `User role updated to ${role}` });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new AdminController();
