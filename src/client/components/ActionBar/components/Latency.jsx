import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Intent, NumericInput } from '@blueprintjs/core';

import { GlobalContext } from '@client/context';

const styles = theme => ({
    label: {
        marginRight: theme.spacing.unit,
    },
});

export class LatencyField extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object,
    };

    render() {
        const { classes } = this.props;

        return (
            <GlobalContext.Consumer>
                {({ store, updateMockitDebounced }) => (
                    <React.Fragment>
                        <label
                            className={classes.label}
                            htmlFor="latency"
                        >
                            Latency (ms)
                        </label>
                        <NumericInput
                            large
                            id="latency"
                            intent={Intent.PRIMARY}
                            majorStepSize={50}
                            min={0}
                            onValueChange={val => updateMockitDebounced({ latency: val })}
                            placeholder={store.latency}
                            stepSize={50}
                            value={store.latency}
                        />
                    </React.Fragment>
                )}
            </GlobalContext.Consumer>
        );
    }
}

export default withStyles(styles)(LatencyField);
