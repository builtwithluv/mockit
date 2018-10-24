import cloneDeep from 'lodash/cloneDeep';
import differenceBy from 'lodash/differenceBy';
import flow from 'lodash/flow';

import {
    createActiveResponses,
    getFixturePathById,
    getFixtures,
    removeFile,
    setNextActive,
    setNextLatency,
} from './helpers';

export default function createMockit() {
    // Global state to be used throughout application
    let state = getDefaultState();

    // This is used to take a snapshot of the first state creation
    // To be used when resetting state
    const initialState = cloneDeep(state);

    function getState() {
        return state;
    }

    function getDefaultState() {
        const fixtures = getFixtures();
        const latency = 50;

        return {
            fixtures,
            latency,
            activeFixtures: createActiveResponses(fixtures),
        };
    }

    function reloadFixtures() {
        state.fixtures = getFixtures();
        state.activeFixtures = createActiveResponses(state.fixtures);
    }

    function reset() {
        flow(
            (a, b) => differenceBy(a, b, 'id'),
            diffs => diffs.map(fixture => getFixturePathById(fixture.id)),
            paths => paths.forEach(filePath => removeFile(filePath)),
            () => state = cloneDeep(initialState),
        )(state.fixtures, initialState.fixtures);
    }

    function update(next) {
        const state = getState();

        // ! All the next functions will modify mockit directly
        setNextActive(next, state);
        setNextLatency(next, state);
    }

    return {
        getState,
        reloadFixtures,
        reset,
        update,
    };
}
