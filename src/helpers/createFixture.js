const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const _url = require('url');
const beautify = require('js-beautify');
const { fixturesPath } = require('./getConfig');

module.exports = function createFixture({
    data,
    filename,
    url,
    description = 'No description added.',
    id = uuidv4(),
    method = 'GET',
    status = 200,
}) {
    const fileName = `${method}-${status}-${filename || id}.js`;

    const fixture = {
        id,
        method,
        description,
        data,
        status,
        url: _url.parse(url).pathname,
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
}
