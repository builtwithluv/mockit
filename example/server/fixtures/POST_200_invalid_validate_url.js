module.exports = {
    description: 'Endpoint does not exist',
    url: '/api/test2',
    method: 'POST',
    validator: {
        url: 'http://localhost:3000/notExist',
    },
    data: {
        hello: 'world',
    },
};
