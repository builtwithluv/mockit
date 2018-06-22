const fs = require('fs');
const path = require('path');
const getConfig = require('./getConfig');

module.exports = function getAlwaysErrorFixture() {
    const config = getConfig();
    const fixturesPath = config.fixturesPath;
    const alwaysErrorFixtureFilePath = path.resolve(path.join(fixturesPath, '__alwaysError__.js'));

    if (fs.existsSync(alwaysErrorFixtureFilePath)) {
        return require(alwaysErrorFixtureFilePath);
    }

    const defaultAlwaysErrorFixture = {
        statusCode: 400,
        data: { error: 'No custom fixture loaded. Set one by creating a fixture call "__alwaysError__.js." under the fixtures root.' },
    };

    return defaultAlwaysErrorFixture;
}
