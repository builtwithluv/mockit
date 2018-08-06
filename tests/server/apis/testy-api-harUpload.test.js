import request from 'supertest';
import app from '@/example/server/server';

describe('/testy/api/harUpload', () => {
    describe('POST', () => {
        test('respond with 200', (done) => {
            request(app)
                .post('/testy/api/harUpload')
                .send({ log: { entries: [] } })
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(done);
        });

        test('respond with 400', (done) => {
            request(app)
                .post('/testy/api/harUpload')
                .send()
                .set('Accept', 'application/json')
                .expect(400)
                .end(done);
        });
    });
});
