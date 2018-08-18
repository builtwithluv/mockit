import { Colors } from '@blueprintjs/core';

export default function getStatusCodeColor(status) {
    if (status < 200) {
        return Colors.COBALT4;
    }
    if (status < 300) {
        return Colors.GREEN4;
    }
    if (status < 400) {
        return Colors.GOLD4;
    }
    if (status < 500) {
        return Colors.RED4;
    }
    return Colors.GRAY4;
}
