export default function setNextLatency(next, mockit) {
    if (next.hasOwnProperty('latency')) {
        mockit.latency = next.latency;
    }
}
