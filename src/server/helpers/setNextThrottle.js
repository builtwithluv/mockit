export default function setNextThrottle(next, mockit) {
    if (next.hasOwnProperty('throttle')) {
        mockit.throttle = next.throttle;
    }
}
