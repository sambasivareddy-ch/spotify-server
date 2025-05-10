import { createClient } from 'redis';

// Redis client instance
let redisClient = null;

// Initialize Redis client
export const initializeRedis = async () => {
    redisClient = createClient({
        url: `redis://default:${process.env.REDIS_PASSWORD}@trolley.proxy.rlwy.net:45788`,
        socket: {
            connectTimeout: 60000,
        }
    }); // e.g., 'redis://default:password@host:port'

    redisClient.on('connect', () => {
        console.log('Connected to Redis');
    });

    redisClient.on('error', (err) => {
        console.error(`Error: ${err}`);
    });

    redisClient.on('end', () => {
        console.log('Disconnected from Redis');
    });

    try {
        await redisClient.connect();
        console.log('Redis client connected successfully');
    } catch (err) {
        console.error(`Error connecting to Redis: ${err}`);
    }
};

// Get Redis client
export const getRedisClient = () => {
    if (!redisClient) {
        console.error('Redis client not initialized');
    }
    return redisClient;
}

// Close Redis client
export const closeRedis = async () => {
    if (redisClient) {
        await redisClient.quit();
        redisClient = null;
        console.log('Redis client disconnected successfully');
    }
}