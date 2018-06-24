const getConfig = require('../../helpers/getConfig');

module.exports = function getAlwaysErrorFixture() {
    const { alwaysErrorFixture } = getConfig();

    if (alwaysErrorFixture) {
        return alwaysErrorFixture;
    }

    const defaultAlwaysErrorFixture = {
        status: 400,
        data: { error: 'No custom fixture loaded. Add one in the configuration file. See docs.' },
    };

    return defaultAlwaysErrorFixture;
}
