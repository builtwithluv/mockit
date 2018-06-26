import React from 'react';

export const StoreContext = React.createContext({
    isLoading: false,
    store: {
        active: {},
        alwaysError: false,
        fixtures: [],
        latency: 50,
    },
    updateTesty: () => {},
    updateTestyDebounced: () => {},
});
