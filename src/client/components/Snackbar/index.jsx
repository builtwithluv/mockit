import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { StoreContext } from 'Context';

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

export class SimpleSnackbar extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes } = this.props;
        return (
            <StoreContext.Consumer>
                {({ isSnackbarOpen, snackbarMessage, handlers}) => (
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={isSnackbarOpen}
                        autoHideDuration={4000}
                        onClose={(_, reason) => {
                            if (reason === 'clickaway') {
                                return;
                            }
                            handlers.toggleSnackbar();
                        }}
                        ContentProps={{
                            'aria-describedby': 'snackbar-message',
                        }}
                        message={<span id="snackbar-message">{snackbarMessage}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={() => handlers.toggleSnackbar()}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                )}
            </StoreContext.Consumer>
        );
    }
}

export default withStyles(styles)(SimpleSnackbar);
