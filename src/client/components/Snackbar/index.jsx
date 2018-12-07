import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { GlobalContext } from '@client/context';

export class SimpleSnackbar extends React.PureComponent {
    static propTypes = {
        snackbarMessage: PropTypes.string,
        toggleSnackbar: PropTypes.func,
    };

    static contextType = GlobalContext;

    render() {
        const {
            snackbarMessage,
            toggleSnackbar,
        } = this.context;

        return (
            <Snackbar
                open
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
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
