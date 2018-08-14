import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {
    Classes,
    Icon,
    Position,
    Tooltip,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import getMethodColor from '@client/common/helpers/getMethodColor';
import getStatusColor from '@client/common/helpers/getStatusCodeColor';

const styles = () => ({
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
        } = this.props;

        return (
            <Tooltip
                content={description}
                hoverOpenDelay={450}
                popoverClassName="sidebar-tooltip--width"
                position={Position.BOTTOM}
            >
                <Grid container wrap="nowrap" alignItems="center">
                    <Grid container className={classes.iconsContainer}>
                        {isActive && <Icon icon={IconNames.SELECTION} iconSize={10} />}
                    </Grid>
                    <Grid
                        item
                        className={classes.method}
                        style={{
                            color: getMethodColor(method),
                        }}
                    >
                        {method}
                    </Grid>
                    <Grid
                        item
                        className={classes.status}
                        style={{
                            color: getStatusColor(status),
                        }}
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
            </Tooltip>
        );
    }
}

export default withStyles(styles)(NodeItemLabel);
