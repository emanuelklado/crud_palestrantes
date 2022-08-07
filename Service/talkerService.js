const fs = require('fs/promises');

const TALKERJSON = './talker.json';
const INTERNALERROR = 'Internal server error'; 

const getAllTalkers = async (req, res, _next) => {
    try {
        const talker = await fs.readFile(TALKERJSON, 'utf8');
        res.status(200).json(JSON.parse(talker));
    } catch (error) {
        res.status(500).json({ message: INTERNALERROR });
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
        res.status(500).json({ message: INTERNALERROR });
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
        res.status(500).json({ message: INTERNALERROR });
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
        res.status(500).json({ message: INTERNALERROR });
    }
};

const searchTalkers = async (req, res, _next) => {
    try {
    const { q } = req.query;
    console.log('entrei no search');
    const talker = await fs.readFile(TALKERJSON, 'utf8');
    const talkerJson = JSON.parse(talker);
  
    const talkers = talkerJson.filter((talk) => 
    talk.name.toLowerCase().includes(q.toLowerCase()));
      
    if (!q || q === '') {
        return res.status(200).json({ message: 'Preencha o campo de busca' });
    } 
        return res.status(200).json(talkers);
    } catch (error) {
        res.status(500).json({ message: INTERNALERROR });
    }
};

    // const { name } = req.query;
    // const talker = await fs.readFile(TALKERJSON, 'utf8');
    // const talkerJson = JSON.parse(talker);
    // const talkers = talkerJson.filter((talk) => 
    // talk.name.toLowerCase().includes(name.toLowerCase()));
    // if (talkers.length > 0) {
    //     res.status(200).json(talkers);
    // } else {
    //     res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    // }
module.exports = {
    getAllTalkers,
    getTalkerById,
    createTalker,
    updateTalker,
    deleteTalker,
    searchTalkers,
};