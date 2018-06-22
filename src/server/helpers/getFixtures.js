const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');

const config = require('../../helpers/getConfig')();

const DEFAULT_PATH = path.resolve(config.fixturesPath);

module.exports = function getFixtures(contents = [], filePath = DEFAULT_PATH) {
    const files = fs.readdirSync(filePath);

    files.forEach(fileName => {
        const fullPath = path.join(filePath, fileName);

        if (fs.statSync(fullPath).isDirectory()) {
            getFixtures(contents, fullPath);
        } else {
            // This is a unique fixture that should not show. It is used
            // to default an error scenario. Skip this.
            if (fullPath === path.join(DEFAULT_PATH, '__alwaysError__.js')) {
                return;
            }

            const fixture = require(fullPath);

            if (!fixture.hasOwnProperty('id')) {
                fixture.id = uuidv4();
            }

            if (!fixture.hasOwnProperty('method')) {
                fixture.method = 'GET';
            }

            contents.push(fixture);
        }
    });

    return contents;
}
