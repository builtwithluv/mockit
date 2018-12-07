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

    static contextType = GlobalContext;

    render() {
        const { store: { latency }, updateMockitDebounced } = this.context;
        const { classes } = this.props;

        return (
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
                    placeholder={latency}
                    stepSize={50}
                    value={latency}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(LatencyField);
