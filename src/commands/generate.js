const fetch = require('node-fetch');
const createFixture = require('../helpers/createFixture');

// TODO Need to add options support from arguments
module.exports = function generate(url, options = {}) {
    let status;

    fetch(url, options)
        .then(d => {
            status = d.status;
            return d.json();
        })
        .then(data => {
            createFixture({
                data,
                status,
                url,
            });
        })
        .catch(err => console.error(err));
};
