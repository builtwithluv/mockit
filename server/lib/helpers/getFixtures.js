const fs = require('fs');
const path = require('path');

const defaultPath = path.resolve('server', 'fixtures');

module.exports = function getFixtures(contents = [], filePath = defaultPath) {
    const files = fs.readdirSync(filePath);

    files.forEach(fileName => {
        if (fs.statSync(path.join(filePath, fileName)).isDirectory()) {
            getFixtures(contents, path.join(filePath, fileName));
        } else {
            contents.push(require(path.join(filePath, fileName)));
        }
    });
    
    return contents;
}
