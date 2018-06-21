const express = require('express');
const armada = require('../../lib');

const app = express();

// TODO allow flexible use of just sending body as a object in javascript
app.use(express.json({ type: 'application/json' }));

armada(app);

app.listen('3000', () => {
    console.log('Mock server started on localhost:3000');
});
