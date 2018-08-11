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

import getMethodColor from '@client/common/helpers/getMethodColor';
import getStatusColor from '@client/common/helpers/getStatusCodeColor';

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
                            {activeFixtures[method][url].id === id && <Icon icon={IconNames.SELECTION} iconSize={10} />}
                        </Grid>
                        <Grid
                            item
                            style={{
                                width: 40,
                                color: getMethodColor(method),
                                fontSize: '0.75em',
                                fontWeight: 800,
                                textAlign: 'center',
                                marginRight: 8,
                            }}
                        >
                            {method}
                        </Grid>
                        <Grid
                            item
                            style={{
                                width: 30,
                                color: getStatusColor(status),
                                fontSize: '0.75em',
                                fontWeight: 600,
                            }}
                        >
                            {status}
                        </Grid>
                        <Grid
                            item
                            xs
                            zeroMinWidth
                            className={Classes.TEXT_OVERFLOW_ELLIPSIS}
                        >
                            {description}
                        </Grid>
                    </Grid>
                </Tooltip>
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
