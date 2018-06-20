module.exports = {
    // The id that represents this response
    // Used to set active response
    id: 'THIRD_CONTRACT',

    description: "THIRD_CONTRACT",

    url: '/api/test',

    method: 'GET',
    statusCode: 400,

    // Data is the contract or the response to send
    // Will be in JSON format
    data: {
        error: 'No data',
    },
};
