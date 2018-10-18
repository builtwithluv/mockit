import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Adjust from '@material-ui/icons/Adjust';
import { Classes } from '@blueprintjs/core';

import getMethodColor from '@client/helpers/getMethodColor';
import getStatusColor from '@client/helpers/getStatusCodeColor';

const styles = () => ({
    icon: {
        fontSize: 12,
    },
    iconsContainer: {
        width: 15,
    },
    method: {
        width: 40,
        fontSize: '0.75em',
        fontWeight: 800,
        textAlign: 'center',
        marginRight: 8,
    },
    popover: {
        maxWidth: 350,
    },
    status: {
        width: 30,
        fontSize: '0.75em',
        fontWeight: 600,
    }
});

export class NodeItemLabel extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object,
        description: PropTypes.string,
        isActive: PropTypes.bool,
        method: PropTypes.string,
        status: PropTypes.number,
    };

    render() {
        const {
            classes,
            description,
            isActive,
            method,
            status,
            updateMockit,
        } = this.props;

        return (
            <Grid
                container
                data-tag="sidebar-parent-node-item"
                alignItems="center"
                wrap="nowrap"
                onDoubleClick={updateMockit}
            >
                <Grid container className={classes.iconsContainer}>
                    {isActive && <Adjust data-tag="node-active-indicator" className={classes.icon} />}
                </Grid>
                <Grid
                    item
                    className={classes.method}
                    style={{ color: getMethodColor(method) }}
                >
                    {method}
                </Grid>
                <Grid
                    item
                    className={classes.status}
                    style={{ color: getStatusColor(status) }}
                >
                    {status}
                </Grid>
                <Grid
                    item
                    xs
                    zeroMinWidth
                    className={Classes.TEXT_OVERFLOW_ELLIPSIS}
                >
                    {description}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(NodeItemLabel);
