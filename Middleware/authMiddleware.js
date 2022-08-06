const authMiddleware = (req, res, next) => {
    const { email, password } = req.headers;
    const token = req.headers.authorization;
    
    if (!token) return next({ code: 401, message: 'Missing authorization token' });
    if (!email || !password) return res.status(401).json({ message: 'Missing email or password' });

    next();
};

    module.exports = authMiddleware;