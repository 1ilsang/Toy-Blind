const redis = require('redis');

exports.client = redis.createClient({
    host: 'redis',
    port: 6379
});
