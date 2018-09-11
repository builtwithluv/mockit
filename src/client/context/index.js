import React from 'react';
import { NetworkProfile } from '@server/enums';

export const GlobalContext = React.createContext({
    isLoading: false,
    isSnackbarOpen: false,
    selectedNode: null,
    sidebarBuckets: [],
    snackbarMessage: '',
    store: {
        activeFixtures: {},
        fixtures: [],
        latency: 50,
        throttle: NetworkProfile.DISABLED,
    },
    validations: {},
});
