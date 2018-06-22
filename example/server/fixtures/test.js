module.exports = {
    default: true,

    description: "hello world my name is cheng. hello world my name is cheng. hello world my name is cheng. hello world my name is cheng. ",

    url: '/api/test?a=2',

    statusCode: 200,

    handler: (req, res) => {
        res.json({ firstName: 'Custom  handler' });
    },
};
