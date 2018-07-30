const setNextActive = require('./helpers/setNextActive');
const setNextLatency = require('./helpers/setNextLatency');
const getFixtures = require('./helpers/getFixtures');
const setActiveResponses = require('./helpers/setActiveResponses');

module.exports = function createTesty() {
    const fixtures = getFixtures();
    const LATENCY = 50;

    const testy = {
        fixtures,
        latency: LATENCY,
        active: setActiveResponses(fixtures),
    };

    function getState() {
        return testy;
    }

    function reloadFixtures() {
        testy.fixtures = getFixtures();
    }

    function update(next) {
        // ! All the next functions will modify testy directly
        setNextActive(next, getState());
        setNextLatency(next, getState());
    }

    return {
        getState,
        reloadFixtures,
        update,
    };
}
