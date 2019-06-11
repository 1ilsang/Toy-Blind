const express = require('express');

const redis = require('../utils/redis');
const token = require('../utils/token');
const jwtConfig = require('../config/jwt');

const MESSAGE = require('../const/MESSAGES');

const router = express.Router();
const sub = redis.createClient();
const pub = redis.createClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
