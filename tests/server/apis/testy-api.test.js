import request from 'supertest';
import app from '@/example/server/server';

describe('Test the api path', () => {
    describe('GET', () => {
        test('respond with 200 and json', (done) => {
            request(app)
                .get('/testy/api')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(done);
        });
    });

    describe('PUT', () => {
        test('respond with 200 and json', (done) => {
            request(app)
                .put('/testy/api')
                .send({ id: 'GET_200_CHENG' })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(done);
        });
    });
});
