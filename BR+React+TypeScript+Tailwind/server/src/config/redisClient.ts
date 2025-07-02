import { createClient } from 'redis';

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-17310.c265.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 17310
    }
});

redisClient.on('connect', () => {
    console.log('✅ Redis connected');
});

redisClient.on('error', (err) => {
    console.error('❌ Redis connection error:', err);
});

(async () => {
    await redisClient.connect();
})();

export default redisClient;
