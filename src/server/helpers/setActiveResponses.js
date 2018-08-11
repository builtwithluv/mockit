export default function setActiveResponses(fixtures) {
    return fixtures.reduce((map, fixture) => {
        const { method, url } = fixture;

        // Only overwrite current existing if the fixture is the default.
        // Otherwise, leave as is.
        if (map[method] && map[method][url]) {
            const currentFixture = map[method][url];

            if (fixture.default && !currentFixture.default) {
                map[method] = {
                    ...map[method],
                    [url]: fixture,
                }
            }

            return map;
        }

        // First fixture with method setup
        map[method] = {
            ...map[method],
            [url]: fixture,
        };

        return map;
    }, {});
}
