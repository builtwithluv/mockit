import express from 'express';
import mockit from '../../lib';

const app = express();

mockit(app);

app.get('/validation', (_, res) => res.json({ firstName: 'No', lastName: 'No', hair: { length: '3' } }));

export default app;
