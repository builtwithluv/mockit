module.exports = {
    default: true,

    // The id that represents this response
    // Used to set active response
    id: 'NESTED2_CONTRACT',

    description: "NESTED2_CONTRACT",

    url: '/api/nested2',

    method: 'GET',
    statusCode: 200,

    // Data is the contract or the response to send
    // Will be in JSON format
    data: {
        firstName: 'Cheng',
        lastName: 'Ly',
    },
};
