import { Colors } from '@blueprintjs/core';

export default function getMethodColor(method) {
    const COLORS = {
        DELETE: Colors.RED1,
        GET: Colors.GREEN1,
        POST: Colors.ORANGE1,
        PUT: Colors.BLUE1,
    };

    return COLORS[method];
}
