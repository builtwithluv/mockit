module.exports = {
    id: 'GET_200_CHENG',

    default: true,

    description: "Gives you Cheng Ly",

    url: '/api/test',

    method: 'GET',
    status: 200,

    // Data is the contract or the response to send
    // Will be in JSON format
    data: {
        firstName: 'Cheng',
        lastName: 'Ly',
    },
};
