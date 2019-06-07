const mysql = require('mysql');
const dbConfig = require('../config/dbConfig');
const MESSAGE = require('../const/MESSAGES');

const pool = mysql.createPool({
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || dbConfig.connectionLimit || 10,
    host: process.env.MYSQL_HOST || dbConfig.host || 'localhost',
    user: process.env.MYSQL_USER || dbConfig.user || 'scott',
    password: process.env.MYSQL_PASSWORD || dbConfig.password || 'tiger',
    database: process.env.MYSQL_DATABASE || dbConfig.database || 'blind'
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') console.error(MESSAGE.PROTOCOL_CONNECTION_LOST);
        else if (err.code === 'ER_CON_COUNT_ERROR') console.error(MESSAGE.ER_CON_COUNT_ERROR);
        else if (err.code === 'ECONNREFUSED') console.error(MESSAGE.ECONNREFUSED);
    }
    if (connection) connection.release();
});

module.exports = pool;