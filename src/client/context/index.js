import React from 'react';

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
    },
    validations: {},
});
