import toxy from 'toxy';
import { setWhitelist } from './middlewares';

export default function createToxy() {
    const proxy = toxy();

    proxy.rule(setWhitelist());

    return proxy;
}
