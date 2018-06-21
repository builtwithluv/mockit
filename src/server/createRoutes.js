const createStore = require('./createStore');
const loadTestys = require('./routes/loadTestys');
const loadFixtureRoutes = require('./routes/loadFixtureRoutes');
const loadMiddlewares = require('./routes/loadMiddlewares');

module.exports = function createRoutes(app) {
    const store = createStore();

    loadMiddlewares(app, store);
    loadTestys(app, store);
    loadFixtureRoutes(app, store);
}
