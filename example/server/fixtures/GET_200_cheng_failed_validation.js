module.exports = {
    default: true,

    description: "Gives you Cheng Ly with failed validation Gives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validationGives you Cheng Ly with failed validation",

    url: '/api/test',

    method: 'GET',
    status: 200,

    validate: {
        url: 'http://localhost:3000/validation',
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
