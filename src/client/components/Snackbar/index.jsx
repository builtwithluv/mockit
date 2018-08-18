import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

export class SimpleSnackbar extends React.PureComponent {
    static propTypes = {
        isSnackbarOpen: PropTypes.bool,
        snackbarMessage: PropTypes.string,
        toggleSnackbar: PropTypes.func,
    };

    render() {
        const {
            isSnackbarOpen,
            snackbarMessage,
            toggleSnackbar,
        } = this.props;

        return (
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
                message={
                    <span
                        data-tag="snackbar-message"
                        id="snackbar-message"
                    >
                        {snackbarMessage}
                    </span>
                }
            />
        );
    }
}

export default SimpleSnackbar;
