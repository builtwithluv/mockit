import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import { StoreContext } from './context/store-context';

import getBucketedFixtures from './helpers/getBucketedFixtures';

import ErrorSortContainer from './ErrorSortContainer';
import MethodSortHeader from './MethodSortHeader';

export function MethodSortContainer() {
    return (
        <StoreContext.Consumer>
            {({ store, handlers }) => {
                const buckets = getBucketedFixtures(store.fixtures);
                return buckets.map(([method, urls]) => urls.map(([url, statusCodes]) => {
                    const activeFixture = store.active[method][url];
                    return (
                        <ExpansionPanel key={url}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <MethodSortHeader
                                    activeFixture={activeFixture}
                                    method={method}
                                />
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{ alignItems: 'center' }}>
                                <Grid container>
                                    {statusCodes.map(([code, fixtures]) => (
                                        <Grid key={code} item xs={12}>
                                            <ErrorSortContainer
                                                activeFixture={activeFixture}
                                                code={+code}
                                                fixtures={fixtures}
                                                handleSelectionChange={handlers.updateTesty}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                }));
            }}
        </StoreContext.Consumer>
    );
}

export default MethodSortContainer;
