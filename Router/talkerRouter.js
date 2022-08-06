const express = require('express');

const talkerRouter = express.Router();
const loginRouter = express.Router();
const middleware = require('../Middleware');
const service = require('../Service/talkerService');
const loginService = require('../Service/loginService');

// ROTAS GET
talkerRouter.get('/', service.getAllTalkers);
talkerRouter.get('/:id', service.getTalkerById);

// ROTAS POST
loginRouter.post('/', middleware.authMiddleware, middleware.errorMiddleware, loginService.login);

module.exports = {
    talkerRouter,
    loginRouter,
};