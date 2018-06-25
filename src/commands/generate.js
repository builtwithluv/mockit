const fetch = require('node-fetch');

module.exports = function generate() {
    const createFixture = require('../helpers/createFixture');
    const { generate: items } = require('../helpers/getConfig')();

    items.forEach(({ id, url, description, filename, options = {} }) => {
        let status;

        fetch(url, options)
            .then(d => {
                status = d.status;
                return d.json();
            })
            .then(data => {
                const { method } = options;

                createFixture({
                    id,
                    data,
                    description,
                    filename,
                    method,
                    status,
                    url,
                });
            })
            .catch(err => console.err(err));
    });
}

