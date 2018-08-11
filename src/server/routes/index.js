import createTesty from '../createTesty';
import loadTestys from './loadTestys';
import loadFixtureRoutes from './loadFixtureRoutes';
import loadMiddlewares from './loadMiddlewares';

export default function createRoutes(app) {
    const testy = createTesty();

    loadMiddlewares(app, testy);
    loadTestys(app, testy);
    loadFixtureRoutes(app, testy);
}
