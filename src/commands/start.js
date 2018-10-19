import startNodemon from './helpers/nodemon';
import startServer from './helpers/server';
import startWebsocket from './helpers/ws';

export default function start(watch) {
    if (watch) {
        startNodemon();
        startWebsocket();
    } else {
        startServer();
    }
}
