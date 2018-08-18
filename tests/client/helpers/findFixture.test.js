import { findFixture } from '@client/helpers';

describe('findFixture()', () => {
    const fixtures = [{
        id: 'ab1',
    }, {
        id: 'ab2',
    }];

    it('should find fixture by id', () => {
        expect(findFixture('ab1', fixtures)).toBe(fixtures[0]);
    });
});
