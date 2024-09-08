import express from 'express';
import middleware from './middleware/middleware.js';

const app = express();
app.use(express.json());

app.post('/require', middleware, (req, res) => {
    res.status(200).json({ status: 200, message: 'Authorized' });
});

export default app;