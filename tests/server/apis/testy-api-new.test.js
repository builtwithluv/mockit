import fs from 'fs';
import path from 'path';
import request from 'supertest';
import app from '@/example/server/server';

describe('/testy/api/new', () => {
    describe('POST', () => {
        test('respond with 200 and json', (done) => {
            request(app)
                .post('/testy/api/new')
                .send({ id: 'supertest', url: '/supertest', data: 10 })
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err) => {
                    if (err) return done(err);
                    const file = path.resolve('example', 'server', 'fixtures', 'GET-200-supertest.js');
                    fs.unlink(
                        file,
                        (err) => {
                            if (err) throw err;
                            console.log(`${file} was deleted`);
                            done();
                        }
                    );
                });
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
