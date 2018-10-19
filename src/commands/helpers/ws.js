import path from 'path';
import watch from 'node-watch';
import WebSocket from 'ws';
import config from '../../server/config';

export default function start() {
    const wss = new WebSocket.Server({ port: config.wsPort });

    wss.on('connection', () => {
        watch(path.resolve(config.fixturesPath), { recursive: true }, () => {
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send('reload');
                }
            });
        });
    });
}
