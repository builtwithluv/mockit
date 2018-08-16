import setNextActive from'./helpers/setNextActive';
import setNextLatency from'./helpers/setNextLatency';
import getFixtures from'./helpers/getFixtures';
import createActiveResponses from'./helpers/createActiveResponses';

export default function createTesty() {
    let testy = getDefaultState();

    function getState() {
        return testy;
    }

    function getDefaultState() {
        const latency = 50;
        const fixtures = getFixtures();

        return {
            fixtures,
            latency,
            active: createActiveResponses(fixtures),
        };
    }

    function reloadFixtures() {
        testy.fixtures = getFixtures();
        testy.active = createActiveResponses(testy.fixtures);
    }

    function reset() {
        testy = getDefaultState();
    }

    function update(next) {
        // ! All the next functions will modify testy directly
        setNextActive(next, getState());
        setNextLatency(next, getState());
    }

    return {
        getState,
        reloadFixtures,
        reset,
        update,
    };
}
