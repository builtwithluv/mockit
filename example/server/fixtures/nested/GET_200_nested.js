module.exports = {
    id: 'GET_200_nested',
    default: true,
    description: "Nested level 2 contract set as default",
    url: '/api/nested',
    method: 'GET',
    status: 200,
    headers: {
        'Content-Type': 'text/plain',
    },
    data: {
        firstName: 'Cheng',
        lastName: 'Ly',
    },
};
