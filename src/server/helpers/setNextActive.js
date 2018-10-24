function updateActiveFixtures(id, mockit) {
    const fixture = mockit.fixtures.find(fixture => fixture.id === id);
    if (fixture) {
        mockit.activeFixtures[fixture.method][fixture.url] = fixture;
    }
}

export default function setNextActive(next, mockit) {
    if (next.hasOwnProperty('id')) {
        if (Array.isArray(next.id)) {
            next.id.forEach(id => updateActiveFixtures(id, mockit));
        } else {
            updateActiveFixtures(next.id, mockit);
        };
    }
}
