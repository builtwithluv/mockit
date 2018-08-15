import _url from 'url';

export default function unharify(har) {
    const entries = har.log.entries;

    const supportedEntries = entries.filter(entry => {
        const mimeType = entry.response.content.mimeType;
        return (mimeType || '').includes('application/json');
    });

    return supportedEntries.map(({ request, response }) => {
        const { method, url } = request;
        const { content, status } = response;
        const { text } = content;

        return {
            method,
            status,
            url: _url.parse(url).pathname,
            data: JSON.parse(text),
            description: 'TODO: Add description',
            isChecked: true,
        };
    });
}
