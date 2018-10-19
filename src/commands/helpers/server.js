import path from 'path';

export default function start() {
    require(path.join(__dirname, '..', '..', 'server', 'index.js'));
}
