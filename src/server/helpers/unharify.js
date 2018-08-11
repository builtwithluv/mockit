import createFixture from './createFixture';

export default function unharify(har) {
    const entries = har.log.entries;

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
