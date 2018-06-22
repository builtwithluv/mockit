const path = require('path');

module.exports = function loadTestys(app, store) {
    app.get('/testy', (_, res) => res.sendFile(path.join(__dirname, '../../index.html')));
    app.get('/testy/api', (_, res) => res.json(store.getState()));
    app.put('/testy/api', (req, res) => {
        store.update(req.body);
        return res.json(store.getState());
    });
}
