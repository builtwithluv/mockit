module.exports = {
    default: true,

    description: "FIRST_CONTRACT",

    url: '/api/test',

    method: 'GET',
    statusCode: 200,

    handler: (req, res) => {
        res.json({ firstName: 'Custom  handler' });
    },
};
