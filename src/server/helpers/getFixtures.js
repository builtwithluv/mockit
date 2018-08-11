import fs from 'fs';
import path from 'path';
import uuidv4 from 'uuid/v4';

import config from './getConfig';

const DEFAULT_PATH = path.resolve(config.fixturesPath);

export default function getFixtures(contents = [], filePath = DEFAULT_PATH) {
    const files = fs.readdirSync(filePath);

    files.forEach(fileName => {
        const fullPath = path.join(filePath, fileName);

        if (fs.statSync(fullPath).isDirectory()) {
            getFixtures(contents, fullPath);
        } else {
            const fixture = require(fullPath);

            if (!fixture.hasOwnProperty('id')) {
                fixture.id = uuidv4();
            }

            if (!fixture.hasOwnProperty('method')) {
                fixture.method = 'GET';
            }

            if (!fixture.hasOwnProperty('status')) {
                fixture.status = 200;
            }

            if (!fixture.hasOwnProperty('description')) {
                fixture.description = 'No description added.';
            }

            if (fixture.handler) {
                fixture._handler = fixture.handler.toString();
            }

            contents.push(fixture);
        }
    });

    return contents;
}
