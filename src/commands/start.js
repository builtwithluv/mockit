const express = require('express');
const testy = require('../');

const config = require('../helpers/getConfig');

module.exports = function start() {
    const app = express();

    testy(app);

    app.listen(config.port, () => {
        console.log(`Mock server started on localhost:${config.port}`);
    });
}
