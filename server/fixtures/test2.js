module.exports = {
    // The id that represents this response
    // Used to set active response
    id: 'SECOND_CONTRACT',

    description: "SECOND_CONTRACT",

    url: '/api/test',

    method: 'GET',
    statusCode: 200,

    // Data is the contract or the response to send
    // Will be in JSON format
    data: {
        firstName: 'Bhakti',
        lastName: 'Patel',
    },
};
