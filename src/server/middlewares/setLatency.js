import { isNumber } from "util";

export default function setLatency(mockit, toxy) {
    return (req, res, next) => {
        const { latency } = mockit.getState();

        toxy.remove('latency');

        if (latency !== 0 && typeof latency === 'number') {
            toxy.poison(toxy.poisons.latency({ jitter: latency }));
        }

        next();
    };
}
