import setNextActive from'./helpers/setNextActive';
import setNextLatency from'./helpers/setNextLatency';
import getFixtures from'./helpers/getFixtures';
import setActiveResponses from'./helpers/setActiveResponses';

export default function createTesty() {
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
        testy.active = setActiveResponses(testy.fixtures);
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
