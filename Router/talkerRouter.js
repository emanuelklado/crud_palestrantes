const express = require('express');

const talkerRouter = express.Router();
// const middleware = require('../Middleware');
const service = require('../Service/talkerService');

// ROTAS GET
talkerRouter.get('/', service.getAllTalkers);
talkerRouter.get('/:id', service.getTalkerById);

module.exports = {
    talkerRouter,
};