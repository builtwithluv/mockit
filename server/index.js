const express = require('express');
const createStore = require('./lib/store');
const createRoutes = require('./lib/routes');

const app = express();

// TODO allow flexible use of just sending body as a object in javascript
app.use(express.json({ type: 'application/json' }));

const store = createStore();
createRoutes(app, store);

app.get('/armada', (req, res) => res.json(store.getState()));

app.put('/armada', (req, res) => {
    const err = store.updateActiveResponse(req.body);

    if (err) {
        res.status(400);
        return res.send(err.error);
    }

    return res.json(store.getState());
});

app.listen('3000', () => {
    console.log('Mock server started on localhost:3000');
});
