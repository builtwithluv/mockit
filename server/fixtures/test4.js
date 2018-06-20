module.exports = {
    // The id that represents this response
    // Used to set active response
    id: 'FOURTH_CONTRACT',

    description: 'FOURTH_CONTRACT',

    url: '/api/test2',

    method: 'DELETE',
    statusCode: 200,

    // Data is the contract or the response to send
    // Will be in JSON format
    data: {
        hello: 'world',
    },
};
