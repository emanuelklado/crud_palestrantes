const crypto = require('crypto');

const login = async (req, res, _next) => {
    const token = await crypto.randomBytes(8).toString('hex');
    const user = {
        token,
    };
    return res.status(200).json(user);
};

module.exports = {
    login,
};