import path from 'path';
import express from 'express';
import cors from 'cors';
import { setThrottle } from '../middlewares';

export default function loadMiddlewares(app, mockit, toxy) {
    app.use(cors());
    app.use(setThrottle(mockit, toxy));
    app.use(toxy.middleware());
    app.use(express.json({ type: 'application/json', limit: '50mb' }));
    app.use(express.static(path.join(__dirname, '../../client')));
    app.use('/client/fonts', express.static(path.join(__dirname, '../../client/fonts')));
}
