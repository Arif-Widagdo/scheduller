import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { redis, checkKey } from '../utils/ioredis';
import { responseProcessor } from '../handlers/response/index';
import { randomUUID } from 'crypto';

const router = Router();

// setInterval(() => {
//     const message = { foo: Math.random() };
//     // Publish to my-channel-1 or my-channel-2 randomly.
//     const channel = `my-channel-${1 + Math.round(Math.random())}`;

//     // Message can be either a string or a buffer
//     redis.publish(channel, JSON.stringify(message));
//     console.log('Published %s to %s', message, channel);
// }, 1000);

// redis.on('message', (channel, message) => {
//     console.log('Redis message received on channel:', channel, 'Message:', message);

//     try {
//         const parsedMessage = JSON.parse(message);
//         console.log('Parsed Message:', parsedMessage);
//         // Lakukan sesuatu dengan parsedMessage, misalnya kirim email atau lakukan operasi lainnya
//     } catch (error) {
//         console.error('Error parsing Redis message:', error);
//     }
// });

// redis.subscribe('send_email', (error, count) => {
//     console.log('Subscribed to channel: send_email' + count);
// });

// Pindahkan koneksi cluster ke dalam fungsi handler untuk memastikan koneksi per request
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, id } = req.body;

        const order_id = randomUUID();

        const key = `ORDER_EXPIRE:${order_id}`;

        redis.set(key, JSON.stringify({ name, id }), 'EX', 20);

        checkKey(key);

        res.send(responseProcessor({}, 'Redis cluster connected', true, ''));
    } catch (error) {
        console.error('Error connecting to Redis cluster:', error);
        next(error);
    }
});

// redis.on('pmessage', (pattern, channel, message) => {
//     try {
//         const { name, id } = JSON.parse(message);
//         sendEmail(name, id);
//     } catch (error) {
//         console.error('Error parsing Redis message:', error);
//     }
// });

export default router;
