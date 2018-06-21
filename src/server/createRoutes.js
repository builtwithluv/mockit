const createStore = require('./createStore');
const loadArmadaRoutes = require('./routes/loadArmadaRoutes');
const loadFixtureRoutes = require('./routes/loadFixtureRoutes');
const loadMiddlewares = require('./routes/loadMiddlewares');

module.exports = function createRoutes(app) {
    const store = createStore();

    loadMiddlewares(app, store);
    loadArmadaRoutes(app, store);
    loadFixtureRoutes(app, store);
}
