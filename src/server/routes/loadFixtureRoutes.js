module.exports = function loadFixtureRoutes(app, store) {
    const state = store.getState();
    const fixtures = state.fixtures;

    fixtures.forEach(({ method, url }) => {
        app[method.toLowerCase()](url, (_, res) => {
            const state = store.getState();
            const latency = state.latency;
            const active = state.active[method][url];

            setTimeout(() => {
                res.status(active.statusCode);
                res.json(active.data);
            }, latency);
        });
    });
}
