const path = require('path');
const express = require('express');

module.exports = function loadMiddlewares(app) {
    app.use(express.json({ type: 'application/json', limit: '50mb' }));
    app.use(express.static(path.join(__dirname, '../../client')));
    app.use('/client/fonts', express.static(path.join(__dirname, '../../client/fonts')));
}
