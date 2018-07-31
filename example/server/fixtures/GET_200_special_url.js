module.exports = {
    description: "Uses special url",

    url: '/api/test/:id',

    method: 'GET',
    status: 200,

    handler: (req, res) => {
        const id = req.params.id;
        return res.send(id);
    },
};
