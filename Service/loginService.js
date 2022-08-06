const crypto = require('crypto');

const login = (req, res, _next) => {
    const { email, password } = req.body;
    const token = crypto.randomBytes(8).toString('hex');
    const user = {
        email,
        password,
        token,
    };
    return res.status(200).json(user);
};

module.exports = {
    login,
};