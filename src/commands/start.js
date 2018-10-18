import path from 'path';
import nodemon from 'nodemon';
import config from '../server/config';

export default function start(watch) {
    const serverScript = path.join(__dirname, 'helpers', 'server.js');

    if (watch) {
        nodemon({
            script: serverScript,
            watch: [
                path.resolve(config.fixturesPath),
            ],
        });

        nodemon.on('restart', files => {
            console.log('App restarted due to: ', files);
        });
    } else {
        require(serverScript);
    }
}
