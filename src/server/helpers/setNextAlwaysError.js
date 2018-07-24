module.exports = function setNextAlwaysError(next, testy) {
    if (next.hasOwnProperty('alwaysError')) {
        testy.alwaysError = !!alwaysError;
    }
}
