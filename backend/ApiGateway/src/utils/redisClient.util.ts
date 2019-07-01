import * as redis from 'redis';

export const client = redis.createClient(
    Number(process.env.REDIS_PORT) || 6379,
    process.env.REDIS_HOST || '127.0.0.1',
);
