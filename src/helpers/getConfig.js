const fs = require('fs');
const path = require('path');
const defaultConfig = require('./getDefaultConfig')();

module.exports = function getConfig() {
    const testyConfigurationFilePath = path.resolve('.testy');

    if (fs.existsSync(testyConfigurationFilePath)) {
        const content = JSON.parse(fs.readFileSync(testyConfigurationFilePath));
        return {
            ...defaultConfig,
            ...content,
        };
    }

    return defaultConfiguration;
}
