import express from 'express';
import mockit from '../..';

import config from '../../server/config';

const app = express();

mockit(app);

app.listen(config.port, () => {
    console.log(`Mock server started on localhost:${config.port}`);
});
