import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import ErrorSortContainer from './ErrorSortContainer';
import MethodSortHeader from './MethodSortHeader';

export class MethodSortContainer extends React.PureComponent {
    render() {
        const {
            activeFixtures,
            buckets,
            handleSelectionChange,
        } = this.props;

        return buckets.map(([method, urls]) => urls.map(([url, statusCodes]) => {
            const activeFixture = activeFixtures[method][url];
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
                                        handleSelectionChange={handleSelectionChange}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            );
        }));
    }
}

MethodSortContainer.propTypes = {
    activeFixtures: PropTypes.object.isRequired,
    buckets: PropTypes.array.isRequired,
    handleSelectionChange: PropTypes.func.isRequired,
};

export default MethodSortContainer;
