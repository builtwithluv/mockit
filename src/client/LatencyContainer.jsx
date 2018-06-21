import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    root: {
        marginBottom: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

export class LatencyContainer extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        handleLatencyChange: PropTypes.func.isRequired,
        latency: PropTypes.number.isRequired,
    };

    render() {
        const {
            classes,
            handleLatencyChange,
            latency,
        } = this.props;
        return (
            <div className={classes.root}>
                <Grid container justify="flex-end">
                    <Grid item>
                        <TextField
                            id="latency-input"
                            label="Latency"
                            className={classes.textField}
                            defaultValue={latency}
                            type="number"
                            margin="normal"
                            onChange={e => handleLatencyChange(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(LatencyContainer);
