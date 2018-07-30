module.exports = function setNextLatency(next, testy) {
    if (next.hasOwnProperty('latency')) {
        testy.latency = next.latency;
    }
}
