const fs = require('fs');
const path = require('path');

module.exports = function unharify() {
    const createFixture = require('../helpers/createFixture');
    const config = require('../helpers/getConfig')();

    const harFilePath = path.resolve(config.harFilePath);
    const harContent = JSON.parse(fs.readFileSync(harFilePath, 'utf8'));
    const entries = harContent.log.entries;

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
