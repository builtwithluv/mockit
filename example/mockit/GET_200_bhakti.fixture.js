module.exports = {
    id: 'GET_200_bhakti',
    description: "Gives you Bhakti Patel",
    url: '/api/test',
    method: 'GET',
    status: 200,
    handler: (req, res) => {
        res.json({ firstName: 'Bhakti', lastName: 'Patel '});
    },
};
