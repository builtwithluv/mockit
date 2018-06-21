const fs = require('fs');
const path = require('path');

module.exports = function getConfig() {
    return JSON.parse(fs.readFileSync(path.resolve('.armada')));
}
