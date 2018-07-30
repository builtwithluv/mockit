import { flow } from 'lodash';

import React from 'react';
import Grid from '@material-ui/core/Grid';
import {
    Classes,
    Colors,
    Icon,
    Position,
    Tooltip,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import getMethodColor from 'Helpers/getMethodColor';
import getStatusColor from 'Helpers/getStatusCodeColor';

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

function createNodeList(buckets, active) {
    const nodes = Object.entries(buckets).reduce((nodeList, [url, fixtures]) => {
        const node = {
            id: url,
            hasCaret: true,
            isExpanded: true,
            label: <span style={{ color: Colors.BLUE1 }}>{url}</span>,
        };

        node.childNodes = fixtures.map(({ id, method, status, description }) => ({
            id,
            label: (
                <Tooltip
                    content={description}
                    hoverOpenDelay={450}
                    popoverClassName="sidebar-tooltip--width"
                    position={Position.BOTTOM}
                >
                    <Grid container wrap="nowrap" alignItems="center">
                        <Grid container style={{ width: 15 }}>
                            {active[method][url].id === id && <Icon icon={IconNames.SELECTION} iconSize={10} />}
                        </Grid>
                        <Grid item style={{ width: 40, color: getMethodColor(method), fontSize: '0.75em', textAlign: 'center', marginRight: 8 }}>
                            {method}
                        </Grid>
                        <Grid item style={{ width: 30, color: getStatusColor(status), fontSize: '0.75em' }}>
                            {status}
                        </Grid>
                        <Grid item xs zeroMinWidth className={Classes.TEXT_OVERFLOW_ELLIPSIS}>
                            {description}
                        </Grid>
                    </Grid>
                </Tooltip>
            ),
        }));

        nodeList.push(node);

        return nodeList;
    }, []);

    return nodes;
}

export default function getBucketedFixtures(store) {
    const buckets = flow(createBuckets, sortByMethod)(store.fixtures);
    return createNodeList(buckets, store.active);
}
