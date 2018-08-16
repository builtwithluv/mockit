import fetch from 'node-fetch';

Cypress.Commands.add('resetTesty', () => {
    const defaultLog = {
        displayName: 'RESET SERVER STATE',
    };

    return fetch('http://localhost:3000/testy/api/reset', {
        method: 'PUT',
    }).then(() => {
        return Cypress.log({
            ...defaultLog,
        });
    }).catch(err => {
        return Cypress.log({
            ...defaultLog,
            message: err,
        });
    });
});

Cypress.Commands.add('switchContract', id => {
    const defaultLog = {
        displayName: 'SWITCH CONTRACT',
    };

    return fetch('http://localhost:3000/testy/api', {
        method: 'PUT',
        data: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(() => {
        return Cypress.log({
            ...defaultLog,
            message: `Switched to ${id}`,
        });
    }).catch(() => {
        return Cypress.log({
            ...defaultLog,
            message: 'Failed to switch',
        });
    });
});
