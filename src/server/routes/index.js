const createTesty = require('../createTesty');
const loadTestys = require('./loadTestys');
const loadFixtureRoutes = require('./loadFixtureRoutes');
const loadMiddlewares = require('./loadMiddlewares');

module.exports = function createRoutes(app) {
    const testy = createTesty();

    loadMiddlewares(app, testy);
    loadTestys(app, testy);
    loadFixtureRoutes(app, testy);
}
