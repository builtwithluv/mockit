import request from 'supertest';
import app from '@/example/server/server';
import removeFile from '@/src/utils/removeFile';

describe('/testy/api/new', () => {
    describe('POST', () => {
        test('should be able to create a new fixture', (done) => {
            request(app)
                .post('/testy/api/new')
                .send({ id: 'supertest', url: '/supertest', data: 10 })
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(() => removeFile('example/server/fixtures/GET-200-supertest.js', done));
        });

        test('should respond with the new state after creation of new fixture', (done) => {
            request(app)
                .post('/testy/api/new')
                .send({ id: 'supertest', url: '/supertest', data: 10 })
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body.fixtures).toContainEqual(expect.objectContaining({
                        id: 'supertest',
                        url: '/supertest',
                        data: 10,
                    }));
                })
                .then(() => removeFile('example/server/fixtures/GET-200-supertest.js', done));
        });

        test('respond with 400', (done) => {
            request(app)
                .post('/testy/api/new')
                .send({ description: 'lala' })
                .set('Accept', 'application/json')
                .expect(400)
                .end(done);
        });
    });
});
