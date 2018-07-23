import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ErrorInfo from 'Components/ErrorInfo';

import getMethodColor from 'Helpers/getMethodColor';
import getStatusCodeColor from 'Helpers/getStatusCodeColor';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
    },
});

export class OrganizerHeader extends React.PureComponent {
    static propTypes = {
        activeFixture: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        method: PropTypes.string.isRequired,
    };

    render() {
        const {
            activeFixture,
            classes,
            method,
        } = this.props;

        const { description, status, url } = activeFixture;

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
                        style={{ color: getStatusCodeColor(status) }}
                    >
                        {status}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography className={classes.secondaryHeading}>
                        {url}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <ErrorInfo fixture={activeFixture} />
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

export default withStyles(styles)(OrganizerHeader);
