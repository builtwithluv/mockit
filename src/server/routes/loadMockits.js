import path from 'path';
import loadFixtureRoutes from './loadFixtureRoutes';
import createFixture from '../helpers/createFixture';
import config from '../config';

export default function loadMockits(app, mockit) {
    app.get('/mockit', (_, res) => {
        return res.render(path.join(__dirname, '../../index.pug'), { wsPort: config.wsPort });
    });
    app.get('/mockit/api', (_, res) => res.json(mockit.getState()));
    app.put('/mockit/api', (req, res) => {
        mockit.update(req.body);
        return res.json(mockit.getState());
    });
    app.put('/mockit/api/reset', (_, res) => {
        mockit.reset();
        return res.json(mockit.getState());
    });
    app.post('/mockit/api/new', (req, res) => {
        const contents = req.body;
        try {
            contents.forEach(content => createFixture(content));
            mockit.reloadFixtures();
            loadFixtureRoutes(app, mockit);
            return res.json(mockit.getState());
        } catch (e) {
            res.status(400);
            return res.send({ message: e });
        }
    });
}
