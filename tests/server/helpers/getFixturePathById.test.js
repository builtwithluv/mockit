import path from 'path';
import getFixturePathById from '@server/helpers/getFixturePathById';

describe('getFixturePathById()', () => {
    it('should return full path of fixture', () => {
        expect(getFixturePathById('GET_200_nested_2'))
            .toBe(path.resolve(
                'example',
                'server',
                'fixtures',
                'nested',
                'nested2',
                'GET_200_nested_2.js'
            ));
    });

    it('should return null if not found', () => {
        expect(getFixturePathById('blahblah')).toBe(null);
    });
});
