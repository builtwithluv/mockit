import React from 'react';

export const StoreContext = React.createContext({
    isLoading: false,
    isSnackbarOpen: false,
    selectedFixture: null,
    sidebarBuckets: [],
    snackbarMessage: '',
    store: {
        active: {},
        fixtures: [],
        latency: 50,
    },
    validations: {},
    updateGlobalContext: () => {},
});
