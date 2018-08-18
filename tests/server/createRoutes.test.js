import request from 'supertest';
import app from '@/example/server/server';

describe('Routes from fixtures', () => {
    test('able to create GET endpoints', (done) => {
        request(app)
            .get('/api/test')
            .expect(200, {
                firstName: 'Cheng',
                lastName: 'Ly',
                hair: {
                    color: 'black',
                    length: 3,
                }
            })
            .end(done);
    });

    test('able to create POST endpoints', (done) => {
        request(app)
            .post('/api/test')
            .expect(200, {
                firstName: 'Cheng',
                lastName: 'Ly',
            })
            .end(done);
    });

    test('able to create PUT endpoints', (done) => {
        request(app)
            .put('/api/test')
            .expect(200)
            .end(done);
    });

    test('able to create DELETE endpoints', (done) => {
        request(app)
            .delete('/api/test')
            .expect(200)
            .end(done);
    });
});
