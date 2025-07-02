import redisClient from '../config/redisClient';

export const getCache = async (key: string) => {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
};

export const setCache = async (key: string, data: any, ttl = 600) => {
    await redisClient.setEx(key, ttl, JSON.stringify(data));
};
