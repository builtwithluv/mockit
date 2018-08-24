import express from 'express';
import mockit from '../';

import config from '../server/config';

export default function start() {
    const app = express();

    mockit(app);

    app.listen(config.port, () => {
        console.log(`Mock server started on localhost:${config.port}`);
    });
}
