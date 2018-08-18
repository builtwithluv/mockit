module.exports = {
    description: "Failed request to retrieve a person",

    url: '/api/test',

    method: 'GET',
    status: 400,

    // Data is the contract or the response to send
    // Will be in JSON format
    data: {
        error: 'No data',
    },
};
