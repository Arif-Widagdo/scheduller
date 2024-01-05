import { Redis } from 'ioredis';

export const redis = new Redis({
    port: Number(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_HOST || '127.0.0.1',
    db: Number(process.env.REDIS_DB) || 0,
    password: process.env.REDIS_PASSWORD || '',
});

export const sendEmail = (key: string) => {
    console.log(`Order id ${key} Terjadwalkan pada : ${new Date()}`);
};

export const checkKey = (key: string) => {
    const intervalId = setInterval(async () => {
        const value = await redis.get(key);
        if (!value) {
            const order_id = key.split(':')[1];
            console.log('====================== EXPIRED ======================');
            sendEmail(order_id);

            clearInterval(intervalId);
        }
    }, 1000);
};
