import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { StoreContext } from './context/store-context';

const styles = theme => ({
    textField: {
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

export class LatencyField extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes } = this.props;
        return (
            <StoreContext.Consumer>
                {({ store, handlers }) => (
                    <TextField
                        id="latency-input"
                        label="Latency"
                        className={classes.textField}
                        defaultValue={store.latency}
                        type="number"
                        margin="normal"
                        onChange={e => handlers.handleLatencyChange(+e.target.value)}
                    />
                )}
            </StoreContext.Consumer>
        );
    }
}

export default withStyles(styles)(LatencyField);
