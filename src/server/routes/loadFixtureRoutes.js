const getAlwaysErrorFixture = require('../helpers/getAlwaysErrorFixture');

module.exports = function loadFixtureRoutes(app, testy) {
    const state = testy.getState();
    const fixtures = state.fixtures;

    fixtures.forEach(({ method, url }) => {
        app[method.toLowerCase()](url, (req, res) => {
            const {
                active,
                alwaysError,
                latency,
            } = testy.getState();

            const {
                data,
                description,
                handler,
                status,
            } = active[method][url];

            setTimeout(() => {
                if (alwaysError) {
                    const alwaysErrorFixture = getAlwaysErrorFixture();
                    res.status(alwaysErrorFixture.status);
                    return res.json(alwaysErrorFixture.data);
                }

                if (handler) {
                    if (typeof handler !== 'function') {
                        console.error(`Handler for ${description} is not a function`);
                    } else {
                        return handler(req, res);
                    }
                }

                res.status(status);
                return res.json(data);
            }, latency);
        });
    });
}
