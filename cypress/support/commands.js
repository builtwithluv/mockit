import fetch from 'node-fetch';

Cypress.Commands.add('switchContract', id => {
    const defaultLog = {
        displayName: 'SWITCH CONTRACT',
    };

    return fetch('http://localhost:3000/testy', {
        method: 'POST',
        data: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(() => {
            return Cypress.log({
                ...defaultLog,
                message: `Switched to ${id}`,
            });
        })
        .catch(() => {
            return Cypress.log({
                ...defaultLog,
                message: 'Failed to switch',
            });
        });
});
