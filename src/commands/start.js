import express from 'express';
import testy from '../';

import config from '../server/config';

export default function start() {
    const app = express();

    testy(app);

    app.listen(config.port, () => {
        console.log(`Mock server started on localhost:${config.port}`);
    });
}
