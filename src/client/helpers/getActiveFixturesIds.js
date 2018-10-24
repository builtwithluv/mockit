export default function getActiveFixturesIds(activeFixtures) {
    return Object.values(activeFixtures).reduce((ids, fixtures) => {
        Object.values(fixtures).forEach(fixture => ids.push(fixture.id));
        return ids;
    }, []);
}
