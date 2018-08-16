import request from 'supertest';
import app from '@/example/server/server';

describe('Test resetting store', () => {
    describe('PUT', () => {
        test('should reset', (done) => {
            const agent = request(app);
            agent
                .put('/testy/api')
                .send({ latency: 100 })
                .end((_, response) => {
                    expect(response.body.latency).toBe(100);
                    agent
                        .put('/testy/api/reset')
                        .end((_, response) => {
                            expect(response.body.latency).toBe(50);
                            done();
                        });
                });
        });
    });
});
