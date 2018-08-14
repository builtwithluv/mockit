import setNextActive from'./helpers/setNextActive';
import setNextLatency from'./helpers/setNextLatency';
import getFixtures from'./helpers/getFixtures';
import createActiveResponses from'./helpers/createActiveResponses';

export default function createTesty() {
    const fixtures = getFixtures();
    const LATENCY = 50;

    const testy = {
        fixtures,
        latency: LATENCY,
        active: createActiveResponses(fixtures),
    };

    function getState() {
        return testy;
    }

    function reloadFixtures() {
        testy.fixtures = getFixtures();
        testy.active = createActiveResponses(testy.fixtures);
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
