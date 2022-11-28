const express = require('express');
const { 
    validationAgeMidd, 
    validationNameMidd, 
    validationTalkMidd, 
    validationWatchedAtMidd, 
    validationRateMidd, 
    validationTokenMidd } = require('../Middleware/createMiddleware');

const talkerRouter = express.Router();
const loginRouter = express.Router();
const middleware = require('../Middleware');
const service = require('../Service/talkerService');
const loginService = require('../Service/loginService');

// ROTAS GET TALKER
talkerRouter.get('/', service.getAllTalkers);

talkerRouter.get('/search', 
validationTokenMidd, 
service.searchTalkers);
talkerRouter.get('/:id', service.getTalkerById);// SEMPRE COLOCAR ROTA DE :ID POR ULTIMO

// ROTAS POST TALKER
talkerRouter.post('/', 
validationTokenMidd, 
validationNameMidd, 
validationAgeMidd,
validationTalkMidd,
validationRateMidd,
validationWatchedAtMidd,
service.createTalker);

// ROTAS POST LOGIN
loginRouter.post('/', middleware.authMiddleware, middleware.errorMiddleware, loginService.login);

// ROTAS PUT TALKER
talkerRouter.put('/:id',
validationTokenMidd, 
validationNameMidd, 
validationAgeMidd,
validationTalkMidd,
validationRateMidd,
validationWatchedAtMidd,
service.updateTalker);

talkerRouter.delete('/:id', validationTokenMidd, service.deleteTalker);

module.exports = {
    talkerRouter,
    loginRouter,
};