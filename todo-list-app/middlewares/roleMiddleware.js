module.exports = function(requiredRole) {
    return (req, res, next) => {
        const { role } = req.user;

        if (role !== requiredRole) {
            return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
        }
        next();
    };
};
