import getFixtures from '@/src/server/helpers/getFixtures';

describe('getFixtures()', () => {
    test('able to get level 1 files', () => {
        expect(getFixtures()).toContainEqual({
                id: expect.anything(),
                default: true,
                description: 'Removes Cheng Ly',
                url: '/api/test',
                method: 'DELETE',
                status: 200,
                data: 'Ok',
        });
    });

    test('able to get level 2 files', () => {
        expect(getFixtures()).toContainEqual({
            id: expect.anything(),
            default: true,
            description: "Nested level 2 contract set as default",
            url: '/api/nested',
            method: 'GET',
            status: 200,
            data: {
                firstName: 'Cheng',
                lastName: 'Ly',
            },
        });
    });

    test('able to get level 3 files', () => {
        expect(getFixtures()).toContainEqual({
            id: expect.anything(),
            description: "Nested level 3 fixture",
            url: '/api/nested2',
            method: 'GET',
            status: 200,
        });
    });

    test('handle default values', () => {
        expect(getFixtures()).toContainEqual({
            id: expect.anything(),
            description: 'No description added.',
            url: '/api/nested',
            method: 'GET',
            status: 200,
        });
    });

    test('gets all the available fixtures', () => {
        expect(getFixtures()).toHaveLength(12);
    });
});
