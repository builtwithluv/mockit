const express = require('express');
const testy = require('../../src');

const app = express();

testy(app);

app.get('/validation', (req, res) => res.json({ firstName: 'No', lastName: 'No', hair: { length: '3' } }));

app.listen('3000', () => {
    console.log('Mock server started on localhost:3000');
});
