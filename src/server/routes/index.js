const createStore = require('../createStore');
const loadArmadaRoutes = require('./loadArmadaRoutes');
const loadFixtureRoutes = require('./loadFixtureRoutes');
const loadMiddlewares = require('./loadMiddlewares');

module.exports = function createRoutes(app) {
    const store = createStore();

    loadMiddlewares(app, store);
    loadArmadaRoutes(app, store);
    loadFixtureRoutes(app, store);
}
