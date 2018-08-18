export default function setNextActive(next, testy) {
    if (next.hasOwnProperty('id')) {
        const fixture = testy.fixtures.find(fixture => fixture.id === next.id);
        testy.active[fixture.method][fixture.url] = fixture;
    }
}
