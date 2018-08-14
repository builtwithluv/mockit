import { flow } from 'lodash';

import React from 'react';
import NodeItemLabel from '@client/components/Sidebar/components/NodeItemLabel';
import NodeParentLabel from '@client/components/Sidebar/components/NodeParentLabel';

function sortByMethod(buckets) {
   Object.values(buckets).forEach(bucket => bucket.sort((a, b) => a.method > b.method));
   return buckets;
}

function createBuckets(fixtures) {
    return fixtures.reduce((buckets, fixture) => {
        if (!buckets[fixture.url]) {
            buckets[fixture.url] = [];
        }

        buckets[fixture.url].push(fixture);

        return buckets;
    }, {});
}

function createNodeList(buckets, activeFixtures) {
    return Object.entries(buckets).reduce((nodeList, [url, fixtures]) => {
        const node = {
            id: url,
            hasCaret: true,
            isExpanded: true,
            label: <NodeParentLabel url={url} />,
        };

        node.childNodes = fixtures.map(({ id, method, status, description }) => ({
            id,
            label: (
                <NodeItemLabel
                    description={description}
                    isActive={activeFixtures[method][url].id === id}
                    method={method}
                    status={status}
                />
            ),
        }));

        nodeList.push(node);

        return nodeList;
    }, []);
}

export default function getNodeList(fixtures, activeFixtures) {
    const buckets = flow(createBuckets, sortByMethod)(fixtures);
    return createNodeList(buckets, activeFixtures);
}
