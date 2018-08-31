import createActiveResponses from '@/src/server/helpers/createActiveResponses';
import fixture1 from '@/example/server/fixtures/GET_200_bhakti.fixture';
import fixture2 from '@/example/server/fixtures/GET_200_cheng_failed_validation.fixture';
import fixture3 from '@/example/server/fixtures/DELETE_200_cheng.fixture';
import fixture4 from '@/example/server/fixtures/PUT_200_update_name.fixture';
import fixture5 from '@/example/server/fixtures/POST_200_cheng.fixture';
import fixture6 from '@/example/server/fixtures/POST_200_invalid_validate_url.fixture';

describe('createActiveResponses()', () => {
    test('it should set fixtures with default as active first', () => {
        expect(createActiveResponses([fixture1, fixture2])).toEqual({
            GET: {
                '/api/test': fixture2,
            },
        });
    });

    test('should set active for every available method and endpoint', () => {
        expect(createActiveResponses([
            fixture1,
            fixture2,
            fixture3,
            fixture4,
            fixture5,
            fixture6,
        ])).toEqual({
            DELETE: {
                '/api/test': fixture3,
            },
            GET: {
                '/api/test': fixture2,
            },
            POST: {
                '/api/test': fixture5,
                '/api/test2': fixture6,
            },
            PUT: {
                '/api/test': fixture4,
            },
        });
    });
});
