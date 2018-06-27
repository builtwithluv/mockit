import React from 'react';

export const StoreContext = React.createContext({
    isLoading: false,
    isSnackbarOpen: false,
    snackbarMessage: '',
    store: {
        active: {},
        alwaysError: false,
        fixtures: [],
        latency: 50,
    },
    toggleLoading: () => {},
    toggleSnackbar: () => {},
    updateTesty: () => {},
    updateTestyDebounced: () => {},
});
