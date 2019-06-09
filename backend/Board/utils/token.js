const jwt = require('jsonwebtoken');

const redis = require('../utils/redis');
const jwtConfig = require('../config/jwt');

const MESSAGE = require('../const/MESSAGES');

exports.get = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        req.token = bearer[1];
        next();
    } else {
        res.status(403).send(MESSAGE.validationError);
    }
};

exports.check = (req, res, next) => {
    jwt.verify(req.token, jwtConfig.secret, (err, authorizedData) => {
        if(err) res.status(403).send(MESSAGE.validationError);
        else {
            redis.client.get(`${authorizedData.email}`, (err, reply) => {
                if(reply === req.token) next();
                else res.status(403).send(MESSAGE.validationError);
            })
        }
    });
};