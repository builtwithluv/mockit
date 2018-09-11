export default function loadFixtureRoutes(app, mockit) {
    const state = mockit.getState();
    const fixtures = state.fixtures;

    fixtures.forEach(({ method, url }) => {
        app[method.toLowerCase()](url, (req, res) => {
            const { activeFixtures } = mockit.getState();

            const {
                data,
                description,
                handler,
                headers,
                status,
            } = activeFixtures[method][url];

            if (handler) {
                if (typeof handler !== 'function') {
                    console.error(`Handler for ${description} is not a function`);
                } else {
                    return handler(req, res);
                }
            }

            res.set(headers || { 'Content-Type': 'application/json' });
            res.status(status);

            return res.send(data);
        });
    });
}
