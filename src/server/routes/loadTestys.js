const path = require('path');
const unharify = require('../../commands/unharify');

module.exports = function loadTestys(app, testy) {
    app.get('/testy', (_, res) => res.sendFile(path.join(__dirname, '../../index.html')));
    app.get('/testy/api', (_, res) => res.json(testy.getState()));
    app.put('/testy/api', (req, res) => {
        testy.update(req.body);
        return res.json(testy.getState());
    });
    app.post('/testy/api/harUpload', (req, res) => {
        const content = req.body;

        try {
            unharify(content);
            return res.send({ message: 'Successfully created fixtures from har' });
        } catch (e) {
            res.status(400);
            return res.send({ message: e });
        }
    });
}
