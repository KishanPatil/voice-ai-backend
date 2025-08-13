import http from 'http';
import { WebSocketServer } from 'ws';
import { config } from './config/env.js';
import app from './app.js';


const server = http.createServer(app);
const wss = new WebSocketServer({ server });


// Global error handling for sync exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Decide: cleanup resources or exit
  process.exit(1);
});

// Global error handling for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
  // Decide: cleanup resources or exit
  process.exit(1);
});

server.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});
