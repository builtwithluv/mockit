const express = require('express');
const testy = require('../../src');

const app = express();

testy(app);

app.listen('3000', () => {
    console.log('Mock server started on localhost:3000');
});
