module.exports = function createRoutes(app, store) {
    const state = store.getState();
    const fixtures = state.fixtures;

    fixtures.forEach(({ method, url }) => {
        app[method.toLowerCase()](url, (req, res) => {
            const state = store.getState();
            const active = state.active[method][url];

            res.status(active.statusCode);
            res.json(active.data);
        });
    });
}
