const fs = require('fs/promises');

const TALKERJSON = './talker.json';
const getAllTalkers = async (req, res, _next) => {
    try {
        const talker = await fs.readFile(TALKERJSON, 'utf8');
        res.status(200).json(JSON.parse(talker));
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get Talker by Id
const getTalkerById = async (req, res, _next) => {
    try {
        const talker = await fs.readFile(TALKERJSON, 'utf8');
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

// post new talker
const createTalker = async (req, res, _next) => {
    try {
        const talker = await fs.readFile(TALKERJSON, 'utf8');
        const talkerJson = JSON.parse(talker);
        const newTalker = {
            id: talkerJson.length + 1,
            name: req.body.name,
            age: req.body.age,
            talk: {
                watchedAt: req.body.talk.watchedAt,
                rate: req.body.talk.rate,
            },
        };
        talkerJson.push(newTalker);
        await fs.writeFile(TALKERJSON, JSON.stringify(talkerJson));
        res.status(201).json(newTalker);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// update talker
const updateTalker = async (req, res, _next) => {
    const { id } = req.params;
    let bodyTalker = req.body;
    bodyTalker = {
        id: parseInt(id, 10),
        ...bodyTalker,
    };
    const talker = await fs.readFile(TALKERJSON, 'utf8');
    const talkerJson = JSON.parse(talker);
    talkerJson.splice(id - 1, 1, bodyTalker);
    await fs.writeFile(TALKERJSON, JSON.stringify(talkerJson));
    res.status(200).json(bodyTalker);
};

// delete talker
const deleteTalker = async (req, res, _next) => {
    try {
        const talker = await fs.readFile(TALKERJSON, 'utf8');
        const talkerJson = JSON.parse(talker);
        const talkerById = talkerJson.find((talk) => talk.id === parseInt(req.params.id, 10));
        if (talkerById) {
            console.log(`talkerbyid: ${talkerById}`);

            const talkerIndex = talkerJson.findIndex((talk) =>
            talk.id === parseInt(req.params.id, 10));
            talkerJson.splice(talkerIndex, 1);
            await fs.writeFile(TALKERJSON, JSON.stringify(talkerJson));
            res.status(204).end();
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
    createTalker,
    updateTalker,
    deleteTalker,
};