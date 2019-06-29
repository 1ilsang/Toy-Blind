import * as redis from 'redis';
import * as redisConfig from '../config/redis';

export const client = redis.createClient(
    Number(process.env.REDIS_PORT) || redisConfig.port || 6379,
    process.env.REDIS_HOST || redisConfig.host || '127.0.0.1',
);
