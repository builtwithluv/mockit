const express = require('express');
const testy = require('../../lib');

const app = express();

testy(app);

app.get('/validation', (req, res) => res.json({ firstName: 'No', lastName: 'No', hair: { length: '3' } }));

module.exports = app;
