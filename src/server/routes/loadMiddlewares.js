import path from 'path';
import express from 'express';

export default function loadMiddlewares(app) {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use(express.json({ type: 'application/json', limit: '50mb' }));
    app.use(express.static(path.join(__dirname, '../../client')));
    app.use('/client/fonts', express.static(path.join(__dirname, '../../client/fonts')));
}
