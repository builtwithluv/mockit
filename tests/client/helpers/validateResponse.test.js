import {
    validateResponse,
    validator,
} from '@client/helpers/validateResponse';

describe('validateResponse()', () => {
    it('should return null promise when no validator present', () => {
        const fixture = {
            id: 'ab',
        };

        validateResponse(fixture).then(d => expect(d).toBe(false));
    });

    it('should return error when validation failed', () => {
        const fixture = {
            id: 'ab',
            validator: jest.fn(),
        };

        validateResponse(fixture).then(d => expect(d).toHaveProperty('error'));
    });

    it('should generate errors object', () => {
        const dataFromFixture = {
            firstName: 'goku',
            lastName: 'son',
            hair: {
                color: 'blue',
            },
        };

        const dataFromResponse = {
            firstName: 1,
        };

        expect(validator(dataFromFixture, dataFromResponse)).toHaveProperty('firstName');
        expect(validator(dataFromFixture, dataFromResponse)).toHaveProperty('lastName');
        expect(validator(dataFromFixture, dataFromResponse)).toHaveProperty('color');
    });
});
