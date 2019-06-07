const redis = require('redis');
const redisConfig = require('../config/redis');

exports.client = redis.createClient(
    process.env.REDIS_PORT || redisConfig.port || 6379,
    process.env.REDIS_HOST || redisConfig.host || "127.0.0.1"
);
