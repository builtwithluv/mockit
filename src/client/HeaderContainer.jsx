import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AlwaysErrorSwitch from './AlwaysErrorSwitch';
import LatencyField from './LatencyField';

const styles = theme => ({
    root: {
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
    },
});

export class HeaderContainer extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <AlwaysErrorSwitch />
                    </Grid>
                    <Grid item>
                        <LatencyField />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(HeaderContainer);
