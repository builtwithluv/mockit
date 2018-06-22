const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');

const config = require('./getConfig')();

const defaultPath = path.resolve(config.fixturesPath);

module.exports = function getFixtures(contents = [], filePath = defaultPath) {
    const files = fs.readdirSync(filePath);

    files.forEach(fileName => {
        const fullPath = path.join(filePath, fileName);

        if (fs.statSync(fullPath).isDirectory()) {
            getFixtures(contents, fullPath);
        } else {
            // This is a unique fixture that should not show. It is used
            // to default an error scenario. Skip this.
            if (fullPath === path.join(defaultPath, '__alwaysError__.js')) {
                return;
            }

            const fixture = require(fullPath);
            fixture.id = uuidv4();
            contents.push(fixture);
        }
    });

    return contents;
}
