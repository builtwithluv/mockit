const createTesty = require('./createTesty');
const loadTestys = require('./routes/loadTestys');
const loadFixtureRoutes = require('./routes/loadFixtureRoutes');
const loadMiddlewares = require('./routes/loadMiddlewares');

module.exports = function createRoutes(app) {
    const testy = createTesty();

    loadMiddlewares(app, testy);
    loadTestys(app, testy);
    loadFixtureRoutes(app, testy);
}
