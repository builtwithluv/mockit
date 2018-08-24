export default function setNextActive(next, mockit) {
    if (next.hasOwnProperty('id')) {
        const fixture = mockit.fixtures.find(fixture => fixture.id === next.id);
        mockit.activeFixtures[fixture.method][fixture.url] = fixture;
    }
}
