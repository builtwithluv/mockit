import request from 'supertest';
import app from '@/example/server/server';

describe('/', () => {
    describe('GET', () => {
        test('respond with 200', (done) => {
            request(app)
                .get('/testy')
                .expect(200)
                .expect('Content-Type', /text\/html/)
                .end(done);
        });
    });
});
