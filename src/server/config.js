import fs from 'fs';
import path from 'path';
import * as CONSTANTS from './constants';

function getConfig() {
    const defaultConfig = {
        fixturesPath: CONSTANTS.FIXTURES_PATH,
        port: CONSTANTS.MOCKIT_PORT,
        wsPort: CONSTANTS.WSS_PORT,
    };

    const mockitConfigurationFilePath = path.resolve(CONSTANTS.MOCKIT_CONFIG_FILENAME);

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
