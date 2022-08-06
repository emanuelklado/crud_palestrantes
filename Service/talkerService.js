const fs = require('fs/promises');

const getAllTalkers = async (req, res, _next) => {
    try {
        const talker = await fs.readFile('./talker.json', 'utf8');
        res.status(200).json(JSON.parse(talker));
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get Talker by Id
const getTalkerById = async (req, res, _next) => {
    try {
        const talker = await fs.readFile('./talker.json', 'utf8');
        const talkerJson = JSON.parse(talker);
        const talkerById = talkerJson.find((talk) => talk.id === parseInt(req.params.id, 10));
        if (talkerById) {
            res.status(200).json(talkerById);
        } else {
            res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllTalkers,
    getTalkerById,
};