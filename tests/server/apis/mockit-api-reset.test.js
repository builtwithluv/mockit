import request from 'supertest';
import app from '@/example/server/server';

describe('Test resetting store', () => {
    describe('PUT', () => {
        test('should reset latency', done => {
            const agent = request(app);

            agent
                .put('/mockit/api')
                .send({ latency: 100 })
                .end((_, response) => {
                    expect(response.body.latency).toBe(100);

                    agent
                        .put('/mockit/api/reset')
                        .end((_, response) => {
                            expect(response.body.latency).toBe(50);
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
