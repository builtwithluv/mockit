const fs = require('fs');
const path = require('path');

module.exports = function getConfig() {
    const testyConfigurationFilePath = path.resolve('.testy');
    const defaultConfiguration = {
        fixturesPath: 'server/fixtures',
    };

    if (fs.existsSync(testyConfigurationFilePath)) {
        return JSON.parse(fs.readFileSync(testyConfigurationFilePath));
    }

    return defaultConfiguration;
}
