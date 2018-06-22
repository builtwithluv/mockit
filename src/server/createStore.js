const getFixtures = require('./helpers/getFixtures');
const setActiveResponses = require('./helpers/setActiveResponses');

module.exports = function createStore() {
    const fixtures = getFixtures();
    const LATENCY = 50;
    const ALWAYS_ERROR = false;

    const store = {
        fixtures,
        alwaysError: ALWAYS_ERROR,
        latency: LATENCY,
        active: setActiveResponses(fixtures),
    };

    function getState() {
        return store;
    }

    function update(action) {
        const {
            id,
            latency,
            alwaysError,
        } = action;

        if (id !== undefined) {
            const fixture = fixtures.find(fixture => fixture.id === id);
            store.active[fixture.method][fixture.url] = fixture;
        }

        if (latency !== undefined) {
            if (!latency) {
                store.latency = LATENCY;
            } else {
                store.latency = latency;
            }
        }

        if (alwaysError !== undefined) {
            store.alwaysError = !!alwaysError;
        }
    }

    return {
        getState,
        update,
    };
}
