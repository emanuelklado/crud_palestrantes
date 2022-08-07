const express = require('express');

const talkerRouter = express.Router();
const loginRouter = express.Router();
const middleware = require('../Middleware');
const service = require('../Service/talkerService');
const loginService = require('../Service/loginService');

// ROTAS GET TALKER
talkerRouter.get('/', service.getAllTalkers);

talkerRouter.get('/search', 
middleware.createMiddleware.validationTokenMidd, 
service.searchTalkers);
talkerRouter.get('/:id', service.getTalkerById);// SEMPRE COLOCAR ROTA DE ID POR ULTIMO

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

// ROTAS PUT TALKER
talkerRouter.put('/:id',
middleware.createMiddleware.validationTokenMidd, 
middleware.createMiddleware.validationNameMidd, 
middleware.createMiddleware.validationAgeMidd,
middleware.createMiddleware.validationTalkMidd,
middleware.createMiddleware.validationRateMidd,
middleware.createMiddleware.validationWatchedAtMidd,
service.updateTalker);

// ROTAS DELETE TALKER
talkerRouter.delete('/:id', middleware.createMiddleware.validationTokenMidd, service.deleteTalker);

module.exports = {
    talkerRouter,
    loginRouter,
};