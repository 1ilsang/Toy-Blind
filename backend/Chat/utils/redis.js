const redis = require('redis');
const redisConfig = require('../config/redis');

exports.client = redis.createClient({
    host: 'redis',
    port: 6379
});
