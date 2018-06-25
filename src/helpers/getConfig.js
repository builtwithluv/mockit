const fs = require('fs');
const path = require('path');

module.exports = function getConfig() {
    const testyConfigurationFilePath = path.resolve('.testy');
    const defaultConfiguration = {
        fixturesPath: 'server/fixtures',
        harFilePath: 'har.har',
    };

    if (fs.existsSync(testyConfigurationFilePath)) {
        const content = JSON.parse(fs.readFileSync(testyConfigurationFilePath));
        if (!content.hasOwnProperty('fixturesPath')) {
            content.fixturesPath = defaultConfiguration.fixturesPath;
        }
        if (!content.hasOwnProperty('harFilePath')) {
            content.harFilePath = defaultConfiguration.harFilePath;
        }
        return content;
    }

    return defaultConfiguration;
}
