import { cloneDeep, differenceBy, flow } from 'lodash';

import {
    createActiveResponses,
    getFixturePathById,
    getFixtures,
    removeFile,
    setNextActive,
    setNextLatency,
} from './helpers';

import { NetworkProfiles } from './enums';

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
        const latency = NetworkProfiles.DISABLED; 1
        const fixtures = getFixtures();

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
        // ! All the next functions will modify mockit directly
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
