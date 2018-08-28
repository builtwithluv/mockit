module.exports = {
    id: 'DELETE_200_cheng',
    default: true,
    description: 'Removes Cheng Ly',
    url: '/api/test',
    headers: {
        'Content-Type': 'text/plain',
    },
    method: 'DELETE',
    status: 200,
    data: 'Ok',
    validator: {
        url: 'http://localhost:3000/api/test',
        method: 'DELETE',
        headers: {
            'Content-Type': 'text/plain',
        }
    }
};
