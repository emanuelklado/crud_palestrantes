const fs = require('fs/promises');
// const talker = require('../talker.json');

// const getTalker = (req, res, _next) => {
//     res.status(200).json(talker);
// };

const getAllTalkers = async (req, res, _next) => {
    try {
        const talker = await fs.readFile('./talker.json', 'utf8');
        res.status(200).json(JSON.parse(talker));
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllTalkers,
};