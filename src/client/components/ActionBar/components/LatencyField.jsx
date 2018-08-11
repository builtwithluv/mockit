import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import { GlobalContext } from '@client/common/context';

const styles = theme => ({
    textField: {
        marginRight: theme.spacing.unit,
        width: 100,
    },
});

export class LatencyField extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes } = this.props;
        return (
            <GlobalContext.Consumer>
                {({ store, updateTestyDebounced }) => (
                    <TextField
                        id="latency-input"
                        label="Latency"
                        className={classes.textField}
                        defaultValue={store.latency}
                        type="number"
                        margin="normal"
                        onChange={e => updateTestyDebounced({ latency: +e.target.value })}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                        }}
                    />
                )}
            </GlobalContext.Consumer>
        );
    }
}

export default withStyles(styles)(LatencyField);
