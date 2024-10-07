const UserService = require('../services/userService');

class UserController {
    async getUserProfile(req, res) {
        try {
            const user = await UserService.getUserProfile(req.userId);
            res.json(user);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await UserService.deleteUser(userId);
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new UserController();
