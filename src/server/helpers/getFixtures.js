import fs from 'fs';
import path from 'path';

import config from '../config';

const DEFAULT_PATH = path.resolve(config.fixturesPath);

export default function getFixtures(contents = [], filePath = DEFAULT_PATH) {
    try {
        const files = fs.readdirSync(filePath);

        files.forEach(fileName => {
            const fullPath = path.join(filePath, fileName);

            if (fs.statSync(fullPath).isDirectory()) {
                getFixtures(contents, fullPath);
            } else {
                if (fileName.match(/(\.fixture.js)$/)) {
                    const fixture = require(fullPath);

                    if (!fixture.hasOwnProperty('id')) {
                        const id = fullPath
                            .replace(`${DEFAULT_PATH}/`, '')
                            .replace(/\.fixture.js$/, '')
                            .replace('/', '-');

                        fixture.id = id;
                    }

                    if (!fixture.hasOwnProperty('method')) {
                        fixture.method = 'GET';
                    }

                    if (!fixture.hasOwnProperty('status')) {
                        fixture.status = 200;
                    }

                    if (!fixture.hasOwnProperty('description')) {
                        fixture.description = '';
                    }

                    if (fixture.handler) {
                        fixture._handler = fixture.handler.toString();
                    }

                    contents.push(fixture);
                }
            }
        });

        return contents;
    } catch (err) {
        return [];
    }
}
