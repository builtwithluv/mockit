import request from 'supertest';
import app from '@/example/server/server';
import { NetworkProfile } from '@server/enums';

describe('Test resetting store', () => {
    describe('PUT', () => {
        test('should reset throttle', done => {
            const agent = request(app);

            agent
                .put('/mockit/api')
                .send({ throttle: NetworkProfile.REGULAR_4G })
                .end((_, response) => {
                    expect(response.body.throttle).toBe(NetworkProfile.REGULAR_4G);

                    agent
                        .put('/mockit/api/reset')
                        .end((_, response) => {
                            expect(response.body.throttle).toBe(NetworkProfile.DISABLED);
                            done();
                        });
                });
        });

        test('should reset fixtures', done => {
            const agent = request(app);

            agent
                .post('/mockit/api/new')
                .send([{ url: '/testinggg' }])
                .end((_, response) => {
                    expect(response.body.fixtures).toHaveLength(13);

                    agent
                        .put('/mockit/api/reset')
                        .end((_, response) => {
                            expect(response.body.fixtures).toHaveLength(12);
                            done();
                        });
                });
        });
    });
});
