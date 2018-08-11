import fs from 'fs';
import path from 'path';
import defaultConfig from './getDefaultConfig';

function getConfig() {
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
