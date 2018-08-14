import fs from 'fs';
import path from 'path';

function getConfig() {
    const defaultConfig = {
        fixturesPath: 'server/fixtures',
        port: 3000,
    };

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

export default getConfig();
