module.exports = {
    id: 'POST_200_CHENG',

    default: true,

    description: "Sets name",

    url: '/api/test',

    method: 'POST',
    status: 200,

    // Data is the contract or the response to send
    // Will be in JSON format
    data: {
        firstName: 'Cheng',
        lastName: 'Ly',
    },
};
