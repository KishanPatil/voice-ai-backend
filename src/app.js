import express from 'express';
import path from 'path';
import healthRoute from './routes/healthRoute.js';
import voiceRoute from './routes/voiceRoute.js';
import cors from "cors";

const app = express();

// Allow frontend origin
app.use(cors());

// Serve frontend build
app.use(express.static('dist'));

// Parse JSON if needed
app.use(express.json());

// API routes
app.use('/api', healthRoute);
app.use('/api', voiceRoute);


// Fallback for SPA
app.get('/', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

// Centralized error handler
app.use((err, req, res, next) => {
    console.error('Express Error:', err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Server Error',
    });
  });

export default app;
