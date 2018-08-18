import { unharify } from '@client/helpers';

describe('unharify()', () => {
    const har = {
        log: {
            entries: [{
                request: {
                    method: 'GET',
                    url: 'http://localhost:3000/testing',
                },
                response: {
                    content: {
                        mimeType: 'application/json',
                        text: JSON.stringify({ hello: 'world' }),
                    },
                    status: 200,
                }
            }],
        }
    };

    it('it to return fixture data', () => {
        expect(unharify(har)).toContainEqual({
            method: 'GET',
            status: 200,
            url: '/testing',
            data: { hello: 'world' },
            description: 'TODO: Add description',
            isChecked: true,
        });
    });
});
