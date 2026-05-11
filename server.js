import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

import connectDB from './config/db.js';
import { ensureDefaultAdmin } from './utils/ensureDefaultAdmin.js';
import { ensureClothTypes } from './utils/ensureClothTypes.js';
import { ensureEmailTemplates } from './utils/ensureEmailTemplates.js';
import app from './app.js';
import { getCorsAllowedOrigins } from './config/corsOrigins.js';

await connectDB();
await ensureDefaultAdmin();
await ensureClothTypes();
await ensureEmailTemplates();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: getCorsAllowedOrigins(),
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('join-cart', (userId) => {
    if (userId) socket.join(`user-${userId}`);
  });
});

app.set('io', io);

server.listen(PORT, () => {
  console.log(`Backend running successfully — http://localhost:${PORT}`);
});

export { io };
