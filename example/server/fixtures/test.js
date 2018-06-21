module.exports = {
    default: true,

    description: "FIRST_CONTRACT",

    url: '/api/test',

    method: 'GET',
    statusCode: 200,

    // Data is the contract or the response to send
    // Will be in JSON format
    data: {
        firstName: 'Cheng',
        lastName: 'Ly',
    },
};
