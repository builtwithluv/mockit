import createTesty from './createTesty';
import loadTestys from './routes/loadTestys';
import loadFixtureRoutes from './routes/loadFixtureRoutes';
import loadMiddlewares from './routes/loadMiddlewares';

export default function createRoutes(app) {
    const testy = createTesty();

    loadMiddlewares(app, testy);
    loadTestys(app, testy);
    loadFixtureRoutes(app, testy);
}
