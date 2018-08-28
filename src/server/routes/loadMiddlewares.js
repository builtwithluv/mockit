import path from 'path';
import express from 'express';
import cors from 'cors';

export default function loadMiddlewares(app) {
    app.use(cors());
    app.use(express.json({ type: 'application/json', limit: '50mb' }));
    app.use(express.static(path.join(__dirname, '../../client')));
    app.use('/client/fonts', express.static(path.join(__dirname, '../../client/fonts')));
}
