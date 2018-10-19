import path from 'path';
import nodemon from 'nodemon';
import config from '../../server/config';

export default function start() {
    nodemon({
        legacyWatch: true,
        script: path.join(__dirname, '..', '..', 'server', 'index.js'),
        watch: [
            path.resolve(config.fixturesPath),
        ],
    });
}
