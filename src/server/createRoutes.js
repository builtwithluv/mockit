import createMockit from './createMockit';
import createToxy from './createToxy';
import loadMockits from './routes/loadMockits';
import loadFixtureRoutes from './routes/loadFixtureRoutes';
import loadMiddlewares from './routes/loadMiddlewares';

export default function createRoutes(app) {
    const mockit = createMockit();
    const toxy = createToxy();

    loadMiddlewares(app, mockit, toxy);
    loadMockits(app, mockit);
    loadFixtureRoutes(app, mockit);
}
