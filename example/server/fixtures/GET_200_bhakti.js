module.exports = {
    description: "Gives you Bhakti Patel",

    url: '/api/test',

    method: 'GET',

    handler: (req, res) => {
        res.json({ firstName: 'Bhakti', lastName: 'Patel '});
    },
};
