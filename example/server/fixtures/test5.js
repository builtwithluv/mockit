module.exports = {
    description: 'FIVTH_CONTRACT',
    url: '/api/test2',
    method: 'POST',
    validate: {
        url: 'http://localhost:3000/notExist',
    },
    data: {
        hello: 'world',
    },
};
