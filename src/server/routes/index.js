import createMockit from '../createMockit';
import loadMockits from './loadMockits';
import loadFixtureRoutes from './loadFixtureRoutes';
import loadMiddlewares from './loadMiddlewares';

export default function createRoutes(app) {
    const mockit = createMockit();

    loadMiddlewares(app, mockit);
    loadMockits(app, mockit);
    loadFixtureRoutes(app, mockit);
}
