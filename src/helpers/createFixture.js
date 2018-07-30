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
    description,
    id,
    method,
    status,
}) {
    id = id || uuidv4(),
    description = description || 'No description added.';
    method = (method && method.toUpperCase()) || 'GET';
    status = Number(status) || 200;

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

    const errs = fs.writeFileSync(
        path.resolve(path.join(fixturesPath, fileName)),
        beautify(`module.exports = ${JSON.stringify(fixture)}`, beautifyOptions),
    );

    if (!errs) {
        console.log(`Saved file: ${fileName}`);
    } else {
        console.log(errs);
    }
}
