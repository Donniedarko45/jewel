// Simple password-based authentication middleware for owner
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Authorization header required'
        });
    }

    // Expecting format: "Bearer <password>"
    const [bearer, password] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !password) {
        return res.status(401).json({
            success: false,
            message: 'Invalid authorization format. Use: Bearer <password>'
        });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({
            success: false,
            message: 'Invalid admin password'
        });
    }

    next();
};

export default authMiddleware;
