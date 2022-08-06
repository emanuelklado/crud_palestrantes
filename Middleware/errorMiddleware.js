const errorMiddleware = (err, req, res, _next) => {
    if (err.code && err.status) {
        console.log('passei por aqui');
       return res.status(err.status).send({ message: err.message, code: err.code });
    }
    return res.status(500).send({ message: 'Internal server error - caindo neste error' });
};

module.exports = errorMiddleware;