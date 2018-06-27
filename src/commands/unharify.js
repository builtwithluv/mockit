const fs = require('fs');
const path = require('path');
const createFixture = require('../helpers/createFixture');
const config = require('../helpers/getConfig')();

module.exports = function unharify(har) {
    let entries;

    if (!har) {
        const harFilePath = path.resolve(config.harFilePath);
        const harContent = JSON.parse(fs.readFileSync(harFilePath, 'utf8'));
        entries = harContent.log.entries;
    } else {
        entries = har.log.entries;
    }

    const supportedEntries = entries.filter(entry => {
        const mimeType = entry.response.content.mimeType;
        return mimeType === 'application/json';
    });

    supportedEntries.forEach(({ request, response }) => {
        const { method, url } = request;
        const { content, status } = response;
        const { text } = content;

        createFixture({
            method,
            status,
            url,
            data: JSON.parse(text),
            description: 'TODO: Add description',
        });
    });
}
