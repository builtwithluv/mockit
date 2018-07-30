module.exports = {
    default: true,

    description: "Gives you Cheng Ly using invalid validation url",

    url: '/api/test',

    method: 'GET',
    status: 200,

    validate: {
        url: 'http://localhost:3000/validations',
        headers: {
            'Content-Type': 'application/json',
        },
    },

    data: {
        firstName: 'Cheng',
        lastName: 'Ly',
        hair: {
            color: 'black',
            length: 3,
        }
    },
};
