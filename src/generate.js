const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const uuidv4 = require('uuid/v4');
const _url = require('url');
const beautify = require('js-beautify');

const { fixturesPath, generate: items } = require('./helpers/getConfig')();

items.forEach(({ id, url, description, filename, options = {} }) => {
    let code;

    fetch(url, options)
        .then(d => {
            code = d.status;
            return d.json();
        })
        .then(data => {
            let method = options.method;

            if (id === undefined) {
                id = uuidv4();
            }

            if (method === undefined) {
                method = 'GET';
            }

            const fallbackFilename = `${method}-${code}-${id}.js`;
            const fileName = filename ? `${method}-${code}-${filename}` : fallbackFilename;

            const fixture = {
                id,
                method,
                description,
                data,
                url: _url.parse(url).pathname,
                statusCode: code,
            };

            const beautifyOptions = {
                indent_size: 4,
                end_with_newline: true,
            };

            fs.writeFile(
                path.resolve(path.join(fixturesPath, fileName)),
                beautify(`module.exports = ${JSON.stringify(fixture)}`, beautifyOptions),
                (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log(`Saved file: ${fileName}`);
                }
            );
        });
});
