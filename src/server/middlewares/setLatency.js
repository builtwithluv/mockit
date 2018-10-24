export default function setLatency(mockit) {
    return (req, res, next) => {
        const { latency } = mockit.getState();
        setTimeout(next, latency);
    };
}
