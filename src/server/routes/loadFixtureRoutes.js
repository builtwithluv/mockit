module.exports = function loadFixtureRoutes(app, store) {
    const state = store.getState();
    const fixtures = state.fixtures;

    fixtures.forEach(({ method, url }) => {
        app[method.toLowerCase()](url, (req, res) => {
            const state = store.getState();
            const latency = state.latency;
            const { data, handler, statusCode } = state.active[method][url];

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
