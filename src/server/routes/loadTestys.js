import path from 'path';
import createFixture from '../helpers/createFixture';

export default function loadTestys(app, testy) {
    app.get('/testy', (_, res) => res.sendFile(path.join(__dirname, '../../index.html')));
    app.get('/testy/api', (_, res) => res.json(testy.getState()));
    app.put('/testy/api', (req, res) => {
        testy.update(req.body);
        return res.json(testy.getState());
    });
    app.put('/testy/api/reset', (_, res) => {
        testy.reset();
        return res.json(testy.getState());
    });
    app.post('/testy/api/new', (req, res) => {
        const contents = req.body;
        try {
            contents.forEach(content => createFixture(content));
            testy.reloadFixtures();
            return res.json(testy.getState());
        } catch (e) {
            res.status(400);
            return res.send({ message: e });
        }
    });
}
