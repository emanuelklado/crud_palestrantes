const express = require('express');

const talkerRouter = express.Router();
// const middleware = require('../Middleware');
const service = require('../Service/talkerService');
const talker = require('../talker.json');

console.log(talker);

// ROTAS GET
talkerRouter.get('/', service.getAllTalkers);

module.exports = {
    talkerRouter,
};