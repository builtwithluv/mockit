const path = require('path');

module.exports = function loadMiddlewares(app, store) {
    app.get('/armada', (_, res) => res.sendFile(path.join(__dirname, '../../index.html')));
    app.get('/armada/api', (_, res) => res.json(store.getState()));
    app.put('/armada/api', (req, res) => {
        const err = store.updateActiveResponse(req.body);

        if (err) {
            res.status(400);
            return res.send(err.error);
        }

        return res.json(store.getState());
    });
}
