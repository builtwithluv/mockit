const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');

const config = require('./getConfig')();

const defaultPath = path.resolve(config.fixturesPath);

module.exports = function getFixtures(contents = [], filePath = defaultPath) {
    const files = fs.readdirSync(filePath);

    files.forEach(fileName => {
        if (fs.statSync(path.join(filePath, fileName)).isDirectory()) {
            getFixtures(contents, path.join(filePath, fileName));
        } else {
            const fixture = require(path.join(filePath, fileName));
            fixture.id = uuidv4();
            contents.push(fixture);
        }
    });

    return contents;
}
