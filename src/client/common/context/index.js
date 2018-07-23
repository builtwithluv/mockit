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
    validations: {},
    setValidations: () => {},
    toggleLoading: () => {},
    toggleSnackbar: () => {},
    updateTesty: () => {},
    updateTestyDebounced: () => {},
});
