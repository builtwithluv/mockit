import { Colors } from '@blueprintjs/core';

export default function getMethodColor(method) {
    const COLORS = {
        DELETE: Colors.RED5,
        GET: Colors.GREEN5,
        POST: Colors.ORANGE5,
        PUT: Colors.BLUE5,
    };

    return COLORS[method];
}
