import path from 'path';
import nodemon from 'nodemon';
import config from '../../server/config';

export default function start(compiler) {
    nodemon({
        exec: compiler === '@babel/register' ? 'babel-node --extensions .js,.ts' : undefined,
        ext: 'js json ts',
        legacyWatch: true,
        script: path.join(__dirname, '..', '..', 'server', 'index.js'),
        watch: [
            path.resolve(config.fixturesPath),
        ],
    });
}
