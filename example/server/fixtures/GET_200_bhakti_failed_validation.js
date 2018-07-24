module.exports = {
    id: 'GET_200_BHAKTI_FAILED',

    description: "Gives you Bhakti Patel with failed validation",

    url: '/api/test',

    method: 'GET',

    validate: {
        url: 'http://localhost:3000/validation',
        headers: {
            'Content-Type': 'application/json',
        },
    },

    // Data is the contract or the response to send
    // Will be in JSON format
    data: {
        firstName: 'Bhakti',
        lastName: 'Patel',
    },
};
