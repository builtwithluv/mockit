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

            if (alwaysError) {
                const alwaysErrorFixture = getAlwaysErrorFixture();
                res.status(alwaysErrorFixture.statusCode);
                return res.json(alwaysErrorFixture.data);
            }

            const {
                data,
                handler,
                statusCode,
            } = active[method][url];

            setTimeout(() => {
                if (handler) {
                    handler(req, res);
                } else {
                    res.status(statusCode);
                    res.json(data);
                }
            }, latency);
        });
    });
}
