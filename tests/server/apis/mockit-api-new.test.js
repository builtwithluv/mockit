import request from 'supertest';
import app from '@/example/server/server';
import removeFile from '@/tests/helpers/removeFile';

describe('/mockit/api/new', () => {
    describe('POST', () => {
        test('should be able to create a new fixture', (done) => {
            request(app)
                .post('/mockit/api/new')
                .send([{ id: 'supertest', url: '/supertest', data: 10 }])
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(() => removeFile('example/mockit/GET-200-supertest.fixture.js', done));
        });

        test('should be able to create multiple fixtures', done => {
            request(app)
                .post('/mockit/api/new')
                .send([
                    { id: 'supertest', url: '/supertest' },
                    { id: 'supertest2', url: '/supertest' },
                ])
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(() => {
                    removeFile('example/mockit/GET-200-supertest.fixture.js', () => {
                        removeFile('example/mockit/GET-200-supertest2.fixture.js', done);
                    });
                });
        });

        test('should respond with the new state after creation of new fixture', (done) => {
            request(app)
                .post('/mockit/api/new')
                .send([{ id: 'supertest', url: '/supertest', data: 10 }])
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
                .then(() => removeFile('example/mockit/GET-200-supertest.fixture.js', done));
        });

        test('respond with 400', (done) => {
            request(app)
                .post('/mockit/api/new')
                .send([{ description: 'lala' }])
                .set('Accept', 'application/json')
                .expect(400)
                .end(done);
        });
    });
});
