import flow from 'lodash/flow';
import get from 'lodash/get';

import React from 'react';
import NodeItemLabel from '@client/components/Sidebar/components/NodeItemLabel';
import NodeParentLabel from '@client/components/Sidebar/components/NodeParentLabel';

function sortByMethod(buckets) {
    Object.values(buckets).forEach(bucket => bucket.sort((a, b) => a.method > b.method));
    return buckets;
}

function sortByUrl(buckets) {
    return Object.entries(buckets).sort(([a], [b]) => {
        const urlA = a.toLowerCase();
        const urlB = b.toLowerCase();

        if (urlA < urlB) return -1;
        if (urlA > urlB) return 1;
        return 0;
    });
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

function createNodeList(sortedBuckets, activeFixtures, updateMockit, selectedNode) {
    return sortedBuckets.reduce((nodeList, [url, fixtures]) => {
        const node = {
            id: url,
            hasCaret: true,
            isExpanded: true,
            label: <NodeParentLabel url={url} />,
        };

        node.childNodes = fixtures.map(({ id, method, status, description }) => ({
            id,
            isSelected: get(selectedNode, 'id') === id,
            label: (
                <NodeItemLabel
                    description={description}
                    isActive={activeFixtures[method][url].id === id}
                    method={method}
                    status={status}
                    updateMockit={() => updateMockit({ id })}
                />
            ),
        }));

        nodeList.push(node);

        return nodeList;
    }, []);
}

export default function getNodeList(fixtures, activeFixtures, updateMockit, selectedNode = {}) {
    const sortedBuckets = flow(createBuckets, sortByMethod, sortByUrl)(fixtures);
    return createNodeList(sortedBuckets, activeFixtures, updateMockit, selectedNode);
}
