const path = require('path');

module.exports = function loadTestys(app, store) {
    app.get('/testy', (_, res) => res.sendFile(path.join(__dirname, '../../index.html')));
    app.get('/testy/api', (_, res) => res.json(store.getState()));
    app.put('/testy/api', (req, res) => {
        const err = store.updateActiveResponse(req.body);

        if (err) {
            res.status(400);
            return res.send(err.error);
        }

        return res.json(store.getState());
    });
}
