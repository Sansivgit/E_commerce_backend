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
import { getApiPublicUrl } from './config/urls.js';

await connectDB();
await ensureDefaultAdmin();
await ensureClothTypes();
await ensureEmailTemplates();

const PORT = process.env.PORT || 5000;
const corsOrigins = getCorsAllowedOrigins();
if (corsOrigins.length === 0) {
  console.error(
    "[cors] No allowed origins. Set CLIENT_URL or FRONTEND_URL / ADMIN_URL (and optional CORS_EXTRA_ORIGINS) in backend/.env",
  );
  process.exit(1);
}

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

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `[EADDRINUSE] Port ${PORT} is already in use. Stop the other backend (or any app) on this port, or set PORT to a free port in backend/.env (e.g. PORT=5001).`,
    );
    process.exit(1);
  }
  console.error(err);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Backend running successfully — ${getApiPublicUrl(PORT)}`);
});

export { io };
