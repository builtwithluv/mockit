import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import { GlobalContext } from 'Context';

const styles = theme => ({

});

export class SimpleSnackbar extends React.PureComponent {
    render() {
        return (
            <GlobalContext.Consumer>
                {({ isSnackbarOpen, snackbarMessage, toggleSnackbar }) => (
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={isSnackbarOpen}
                        autoHideDuration={3000}
                        onClose={(_, reason) => {
                            if (reason === 'clickaway') {
                                return;
                            }
                            toggleSnackbar();
                        }}
                        ContentProps={{
                            'aria-describedby': 'snackbar-message',
                        }}
                        message={<span id="snackbar-message">{snackbarMessage}</span>}
                    />
                )}
            </GlobalContext.Consumer>
        );
    }
}

export default withStyles(styles)(SimpleSnackbar);
