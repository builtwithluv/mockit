const getFixtures = require('./helpers/getFixtures');
const setActiveResponses = require('./helpers/setActiveResponses');

module.exports = function createStore() {
    const fixtures = getFixtures();
    const latency = 50;
    const alwaysError = false;

    const store = {
        alwaysError,
        fixtures,
        latency,
        active: setActiveResponses(fixtures),
    };

    function getState() {
        return store;
    }

    function updateActiveResponse(action) {
        const { id } = action;

        if (!id) {
            return { error: 'Missing id' };
        }

        if (!fixtures.find(fixture => fixture.id === id)) {
            return { error: 'Cannot find a fixture with that id' };
        }

        const fixture = fixtures.find(fixture => fixture.id === id);

        store.active[fixture.method][fixture.url] = fixture;

        return null;
    }

    function updateLatency(action) {
        const { latency } = action;

        if (latency === undefined) {
            return { error: 'No latency specified' };
        }

        if (typeof latency !== 'number') {
            return { error: 'Latency is not a number' };
        }

        store.latency = latency;

        return null;
    }

    function updateAlwaysError(action) {
        const { alwaysError } = action;

        if (alwaysError === undefined) {
            return { error: 'No property alwaysError found' };
        }

        store.alwaysError = !!alwaysError;

        return null;
    }

    return {
        getState,
        updateActiveResponse,
        updateAlwaysError,
        updateLatency,
    };
}
