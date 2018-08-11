import express from 'express';
import testy from '../../lib';

const app = express();

testy(app);

app.get('/validation', (req, res) => res.json({ firstName: 'No', lastName: 'No', hair: { length: '3' } }));

export default app;
