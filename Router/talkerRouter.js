const express = require('express');

const talkerRouter = express.Router();
const loginRouter = express.Router();
const middleware = require('../Middleware');
const service = require('../Service/talkerService');
const loginService = require('../Service/loginService');

// ROTAS GET TALKER
talkerRouter.get('/', service.getAllTalkers);
talkerRouter.get('/:id', service.getTalkerById);

// ROTAS POST TALKER
talkerRouter.post('/', 
middleware.createMiddleware.validationTokenMidd, 
middleware.createMiddleware.validationNameMidd, 
middleware.createMiddleware.validationAgeMidd,
middleware.createMiddleware.validationTalkMidd,
middleware.createMiddleware.validationRateMidd,
middleware.createMiddleware.validationWatchedAtMidd,
service.createTalker);

// ROTAS POST LOGIN
loginRouter.post('/', middleware.authMiddleware, middleware.errorMiddleware, loginService.login);

module.exports = {
    talkerRouter,
    loginRouter,
};