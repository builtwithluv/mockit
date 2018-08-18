import fs from 'fs';
import path from 'path';

import config from '../config';

const DEFAULT_PATH = path.resolve(config.fixturesPath);

export default function getFixturePathById(id, filePath = DEFAULT_PATH, found = '') {
    const files = fs.readdirSync(filePath);

    for (let i = 0; i < files.length; i++) {
        const fileName = files[i];
        const fullPath = path.join(filePath, fileName);

        if (fs.statSync(fullPath).isDirectory()) {
            return getFixturePathById(id, fullPath);
        } else {
            const fixture = require(fullPath);

            if (fixture.id === id) {
                return fullPath;
            }
        }
    }

    return null;
}
