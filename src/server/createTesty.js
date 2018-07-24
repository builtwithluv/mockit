const setNextActive = require('./helpers/setNextActive');
const setNextAlwaysError = require('./helpers/setNextAlwaysError');
const setNextLatency = require('./helpers/setNextLatency');
const getFixtures = require('./helpers/getFixtures');
const setActiveResponses = require('./helpers/setActiveResponses');

module.exports = function createTesty() {
    const fixtures = getFixtures();
    const LATENCY = 50;
    const ALWAYS_ERROR = false;

    const testy = {
        fixtures,
        alwaysError: ALWAYS_ERROR,
        latency: LATENCY,
        active: setActiveResponses(fixtures),
    };

    function getState() {
        return testy;
    }

    function update(next) {
        // ! All the next functions will modify testy directly
        setNextActive(next);
        setNextLatency(next);
        setNextAlwaysError(next);
    }

    return {
        getState,
        update,
    };
}
