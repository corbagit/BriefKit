import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDb, closeDb } from './db/connection.js';
import { runMigrations } from './db/migrate.js';
import authRoutes from './routes/auth.js';
import summaryRoutes from './routes/summaries.js';
import billingRoutes from './routes/billing.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT || '3001', 10);

const app = express();

app.use(cors());
app.use('/api/billing/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/summaries', summaryRoutes);
app.use('/api/billing', billingRoutes);

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'CorbaBriefKit API', version: '1.0.0', timestamp: new Date().toISOString() });
});

// Serve frontend
const distPath = path.join(__dirname, '..', 'public');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(path.join(distPath, 'index.html'), err => {
    if (err) res.json({ message: 'CorbaBriefKit API running', docs: '/api/health' });
  });
});

function start() {
  runMigrations();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n📋 CorbaBriefKit API running on http://0.0.0.0:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health\n`);
  });
}

start();
