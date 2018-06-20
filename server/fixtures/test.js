module.exports = {
    default: true,
    
    // The id that represents this response
    // Used to set active response
    id: 'FIRST_CONTRACT',

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
