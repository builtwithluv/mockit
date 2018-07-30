module.exports = function loadFixtureRoutes(app, store) {
    const state = store.getState();
    const fixtures = state.fixtures;

    fixtures.forEach(({ method, url }) => {
        app[method.toLowerCase()](url, (req, res) => {
            const {
                active,
                latency,
            } = testy.getState();

            const {
                data,
                description,
                handler,
                status,
            } = active[method][url];

            setTimeout(() => {
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
