const fetch = require('node-fetch');

module.exports = function switchContract(id) {
    return fetch('/testy/api', {
        method: 'PUT',
        body: JSON.stringify({ id }),
        headers: {
            'content-type': 'application/json',
        },
    });
};
