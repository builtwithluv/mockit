import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textField: {
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

export class LatencyField extends React.PureComponent {
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
            <TextField
                id="latency-input"
                label="Latency"
                className={classes.textField}
                defaultValue={latency}
                type="number"
                margin="normal"
                onChange={e => handleLatencyChange(e.target.value)}
            />
        );
    }
}

export default withStyles(styles)(LatencyField);
