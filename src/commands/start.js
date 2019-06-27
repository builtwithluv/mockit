import startNodemon from './helpers/nodemon';
import startServer from './helpers/server';
import startWebsocket from './helpers/ws';

export default function start(argv) {
    const compiler = argv.compiler;
    const watch = argv.watch;

    if (compiler) {
        if (compiler === '@babel/register') {
            const options = {
                extensions: ['.es6', '.es', '.js', '.mjs', '.ts']
            };

            require(compiler)(options);
        } else {
            require(compiler);
        }
    }

    if (watch) {
        startNodemon(compiler);
        startWebsocket();
    } else {
        startServer();
    }
}
