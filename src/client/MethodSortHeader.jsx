import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import getMethodColor from './helpers/getMethodColor';
import getStatusCodeColor from './helpers/getStatusCodeColor';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
    },
});

export class MethodSortHeader extends React.PureComponent {
    render() {
        const {
            activeFixture,
            classes,
            method,
        } = this.props;

        const { description, statusCode, url } = activeFixture;

        return (
            <Grid container>
                <Grid item xs={1}>
                    <Typography
                        className={classes.heading}
                        style={{ color: getMethodColor(method) }}
                    >
                        {method}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography
                        className={classes.heading}
                        style={{ color: getStatusCodeColor(statusCode) }}
                    >
                        {statusCode}
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography className={classes.secondaryHeading}>
                        {url}
                    </Typography>
                </Grid>
                <Grid item xs zeroMinWidth>
                    <Typography className={classes.secondaryHeading}>
                        {description}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

MethodSortHeader.propTypes = {
    activeFixture: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    method: PropTypes.string.isRequired,
};

export default withStyles(styles)(MethodSortHeader);
