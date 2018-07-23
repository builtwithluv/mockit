import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NetworkCheck from '@material-ui/icons/NetworkCheck';
import PriorityHigh from '@material-ui/icons/PriorityHigh';

import validateResponse from 'Helpers/validateResponse';

class AlertDialog extends React.Component {
    state = {
        errors: null,
        open: false,
    };

    componentDidMount() {
        this.checkDataSameness();
    }

    checkDataSameness() {
        const { fixture } = this.props;

        validateResponse(fixture)
            .then(errors => this.setState({ errors }))
            .catch(errors => this.setState({ errors }));
    }

    handleClickOpen = (e) => {
        e.stopPropagation();
        this.setState({ open: true });
    };

    handleClose = (e) => {
        e.stopPropagation();
        this.setState({ open: false });
    };

    render() {
        const { errors } = this.state;

        return errors && (
            // TODO Assuming string errors are network
            typeof errors === 'string' ? (
                <NetworkCheck />
            ) : (
                <div>
                    <PriorityHigh onClick={this.handleClickOpen} />
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                    >
                        <DialogTitle id="alert-dialog-title">Discrepancies Found</DialogTitle>
                        <DialogContent>
                            {Object.entries(errors).map(([key, reason], i) => (
                                <DialogContentText key={i}>
                                    {key}: {reason}
                                </DialogContentText>
                            ))}
                        </DialogContent>
                    </Dialog>

                </div>
            )
        );
    }
}

export default AlertDialog;
