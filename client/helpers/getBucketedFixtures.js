import flow from 'lodash.flow';

const METHOD_ORDER = ['GET', 'POST', 'PUT', 'DELETE'];

function sortMethods(fixtures) {
    const ordering = {};

    for (var i = 0; i < METHOD_ORDER.length; i++) {
        ordering[METHOD_ORDER[i]] = i;
    }

    const sorted = fixtures.reduce((bucket, fixture) => {
        if (!bucket[fixture.method]) {
            bucket[fixture.method] = [];
        }

        bucket[fixture.method].push(fixture);

        return bucket;
    }, {});

    return Object.entries(sorted).sort((a, b) => ordering[a[0]] - ordering[b[0]]);
}

function sortUrls(sortedMethods) {
    return sortedMethods.map(meth => {
        const [method, fixtures] = meth;
        const urls = fixtures.reduce((bucket, fixture) => {
            if (!bucket[fixture.url]) {
                bucket[fixture.url] = [];
            }

            bucket[fixture.url].push(fixture);

            return bucket;
        }, {});

        return [method, Object.entries(urls).sort((a, b) => a[0] > b[0])];
    });
}

function sortStatusCodes(sortedUrls) {
    return sortedUrls.map(organizedFixtures => {
        const [method, urls] = organizedFixtures;

        const errors = urls.map(urlMap => {
            const [url, fixtures] = urlMap;
            const errs = fixtures.reduce((bucket, fixture) => {
                if (!bucket[fixture.statusCode]) {
                    bucket[fixture.statusCode] = [];
                }

                bucket[fixture.statusCode].push(fixture);

                return bucket;
            }, {});

            return [url, Object.entries(errs).sort((a, b) => a[0] > b[0])];
        });

        return [method, errors];
    });
}

export default function getBucketedFixtures(fixtures) {
    return flow(sortMethods, sortUrls, sortStatusCodes)(fixtures);
}
