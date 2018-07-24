module.exports = function setNextActive(next, testy) {
    if (next.hasOwnProperty('id')) {
        const fixture = fixtures.find(fixture => fixture.id === id);
        testy.active[fixture.method][fixture.url] = fixture;
    }
}
