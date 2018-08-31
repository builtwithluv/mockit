import fs from 'fs';
import path from 'path';

function getConfig() {
    const defaultConfig = {
        fixturesPath: 'mockit',
        port: 3000,
    };

    const mockitConfigurationFilePath = path.resolve('mockit.json');

    if (fs.existsSync(mockitConfigurationFilePath)) {
        const content = JSON.parse(fs.readFileSync(mockitConfigurationFilePath));
        return {
            ...defaultConfig,
            ...content,
        };
    }

    return defaultConfig;
}

export default getConfig();
