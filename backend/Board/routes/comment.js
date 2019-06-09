const express = require('express');

const mysqlPool = require('../utils/mysql');
const token = require('../utils/token');

const MESSAGE = require('../const/MESSAGES');

const router = express.Router();

router.post('/comment/list', (req, res, next) => {
    res.status(500).send('Not working');
});

modeul.exports = router;