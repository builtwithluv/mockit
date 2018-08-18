export default function setNextActive(next, testy) {
    if (next.hasOwnProperty('id')) {
        const fixture = testy.fixtures.find(fixture => fixture.id === next.id);
        testy.activeFixtures[fixture.method][fixture.url] = fixture;
    }
}
