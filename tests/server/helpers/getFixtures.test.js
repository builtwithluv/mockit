import getFixtures from '@/src/server/helpers/getFixtures';
import level1Fixture from '@/example/server/fixtures/DELETE_200_cheng';
import level2Fixture from '@/example/server/fixtures/nested/GET_200_nested';
import level3Fixture from '@/example/server/fixtures/nested/nested2/GET_200_nested_2';
import defaultValuesFixture from '@/example/server/fixtures/GET_200_default_values';
import handlerFixture from '@/example/server/fixtures/GET_200_bhakti';

describe('getFixtures()', () => {
    test('able to get level 1 files', () => {
        expect(getFixtures()).toContainEqual(level1Fixture);
    });

    test('able to get level 2 files', () => {
        expect(getFixtures()).toContainEqual(level2Fixture);
    });

    test('able to get level 3 files', () => {
        expect(getFixtures()).toContainEqual(level3Fixture);
    });

    test('handle default values', () => {
        expect(getFixtures()).toContainEqual(defaultValuesFixture);
    });

    test('stringify the handler function', () => {
        expect(getFixtures()).toContainEqual({
            ...handlerFixture,
            _handler: handlerFixture.handler.toString(),
        });
    });
});
