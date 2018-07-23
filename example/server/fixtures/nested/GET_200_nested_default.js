module.exports = {
    default: true,

    description: "Nested level 2 contract set as default",

    url: '/api/nested',

    method: 'GET',

    // Data is the contract or the response to send
    // Will be in JSON format
    data: {
        firstName: 'Cheng',
        lastName: 'Ly',
    },
};
