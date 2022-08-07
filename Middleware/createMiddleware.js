const validationTokenMidd = (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ message: 'Token não encontrado' }); 
        if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
        next();
    };

const validationNameMidd = (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) {
 return res.status(400)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
}
    next();
};

const validationAgeMidd = (req, res, next) => {
    const { age } = req.body;
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const validationTalkMidd = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || talk === '') {
 return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório' }); 
}
    next();
};

function validateDate(testdate) {
    const dateRegExp = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
    return dateRegExp.test(testdate);
}
const validationWatchedAtMidd = (req, res, next) => {
    const { watchedAt } = req.body.talk;
    if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    if (!validateDate(watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const validationRateMidd = (req, res, next) => {
    const { rate } = req.body.talk;
    console.log(`aqui eh o rate: ${rate}`);
    console.log(rate === {});
    if (rate < 1 || rate > 5) {
        return res.status(400)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    if (!rate || rate === '') {
        return res.status(400)
        .json({ message: 'O campo "rate" é obrigatório' }); 
}
    next();
};

module.exports = {
validationTokenMidd, 
validationNameMidd,
validationAgeMidd,
validationTalkMidd,
validationRateMidd,
validationWatchedAtMidd,
};
