export default function findFixture(id, fixtures) {
    return fixtures.find(fixture => fixture.id === id);
}
