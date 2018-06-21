const createStore = require('../createStore');
const loadTestys = require('./loadTestys');
const loadFixtureRoutes = require('./loadFixtureRoutes');
const loadMiddlewares = require('./loadMiddlewares');

module.exports = function createRoutes(app) {
    const store = createStore();

    loadMiddlewares(app, store);
    loadTestys(app, store);
    loadFixtureRoutes(app, store);
}
