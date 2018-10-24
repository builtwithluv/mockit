import createMockit from './createMockit';
import loadMockits from './routes/loadMockits';
import loadFixtureRoutes from './routes/loadFixtureRoutes';
import loadMiddlewares from './routes/loadMiddlewares';

export default function createRoutes(app) {
    const mockit = createMockit();

    loadMiddlewares(app, mockit);
    loadMockits(app, mockit);
    loadFixtureRoutes(app, mockit);
}
