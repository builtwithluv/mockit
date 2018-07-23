const express = require('express');
const testy = require('../../lib');

const app = express();

testy(app);

app.get('/validation', (req, res) => res.json({ firstName: 2 }));

app.listen('3000', () => {
    console.log('Mock server started on localhost:3000');
});
