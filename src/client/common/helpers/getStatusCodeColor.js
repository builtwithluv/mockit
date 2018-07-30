import { Colors } from '@blueprintjs/core';

export default function getStatusCodeColor(status) {
    if (status < 200) {
        return Colors.COBALT2;
    }
    if (status < 300) {
        return Colors.GREEN2;
    }
    if (status < 400) {
        return Colors.GOLD2;
    }
    if (status < 500) {
        return Colors.RED2;
    }
    return Colors.GRAY2;
}
