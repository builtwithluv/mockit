import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AlwaysErrorSwitch from './components/AlwaysErrorSwitch';
import LatencyField from './components/LatencyField';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit,
    },
});

export class ActionBar extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <LatencyField />
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Grid item>
                                <AlwaysErrorSwitch />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(ActionBar);
