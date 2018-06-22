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
        handleAlwaysErrorChange: PropTypes.func.isRequired,
        handleLatencyChange: PropTypes.func.isRequired,
        alwaysError: PropTypes.bool.isRequired,
        latency: PropTypes.number.isRequired,
    };

    render() {
        const {
            alwaysError,
            classes,
            handleAlwaysErrorChange,
            handleLatencyChange,
            latency,
        } = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <AlwaysErrorSwitch
                            handleAlwaysErrorChange={handleAlwaysErrorChange}
                            isOn={alwaysError}
                        />
                    </Grid>
                    <Grid item>
                        <LatencyField
                            handleLatencyChange={handleLatencyChange}
                            latency={latency}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(HeaderContainer);
