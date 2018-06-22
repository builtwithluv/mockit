const getAlwaysErrorFixture = require('../helpers/getAlwaysErrorFixture');

module.exports = function loadFixtureRoutes(app, store) {
    const state = store.getState();
    const fixtures = state.fixtures;

    fixtures.forEach(({ method, url }) => {
        app[method.toLowerCase()](url, (req, res) => {
            const {
                active,
                alwaysError,
                latency,
            } = store.getState();

            const {
                data,
                handler,
                statusCode,
            } = active[method][url];

            setTimeout(() => {
                if (alwaysError) {
                    const alwaysErrorFixture = getAlwaysErrorFixture();
                    res.status(alwaysErrorFixture.statusCode);
                    return res.json(alwaysErrorFixture.data);
                }

                if (handler) {
                    return handler(req, res);
                }

                res.status(statusCode);
                return res.json(data);
            }, latency);
        });
    });
}
