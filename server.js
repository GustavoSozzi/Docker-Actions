const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW() as time');
        res.json({
            message: 'API com PostgreSQL funcionando!', dbTime: result.rows[0].time
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'healthy', db: 'connected' });
    } catch (err) {
        res.status(503).json({ status: 'unhealthy', db: 'disconnected' });
    }
});
app.get('/healthtwo', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'healthy', db: 'connected' });
    } catch (err) {
        res.status(503).json({ status: 'unhealthy', db: 'disconnected' });
    }
});
app.get('/version', (req, res) => {
  res.json({ version: '1.0.3' });
});
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});