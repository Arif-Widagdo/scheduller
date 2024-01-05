// import { redis } from '../../utils/ioredis/index';

// // Mendefinisikan fungsi untuk menjalankan tugas
// export function runTask() {
//     console.log('Tugas dijalankan pada:', new Date().toString());
//     return true;
// }

// async function sendEmail(name: string, id: number) {
//     console.log(`Email terkirim ke ${name} dengan ID ${id}`);
// }

// // Menjadwalkan tugas untuk dijalankan setiap 5 detik
// redis.set('my_task', 'run', 'EX', 5, () => {
//     // Menambahkan tugas ke antrian Redis
//     redis.lpush('my_queue', 'my_task');
// });

// // Memulai loop untuk memproses tugas dari antrian Redis
// setInterval(() => {
//     // Mengambil tugas dari antrian
//     redis.rpop('my_queue', (err, task) => {
//         if (err) {
//             console.error(err);
//             return;
//         }

//         // Jika terdapat tugas, jalankan
//         if (task) {
//             runTask();
//         }
//     });
// }, 1000);

// // Menjalankan server Redis
// redis.on('connect', () => {
//     console.log('Redis connected');
// });

// redis.on('error', (err) => {
//     console.error(err);
// });
