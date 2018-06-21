const getFixtures = require('./helpers/getFixtures');
const setActiveResponses = require('./helpers/setActiveResponses');

module.exports = function createStore() {
    const fixtures = getFixtures();

    const store = {
        fixtures,
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

    return {
        getState,
        updateActiveResponse,
    };
}
