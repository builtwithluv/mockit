import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PriorityHigh from '@material-ui/icons/PriorityHigh';

import validateResponse from 'Helpers/validateResponse';

class AlertDialog extends React.PureComponent {
    static propTypes = {
        setValidation: PropTypes.func.isRequired,
        validation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    };

    state = {
        open: false,
    };

    componentDidMount() {
        const { validation } = this.props;

        if (!validation) {
            this.checkDataSameness();
        }
    }

    checkDataSameness() {
        const { fixture, setValidation } = this.props;

        validateResponse(fixture)
            .then(errors => setValidation({ id: fixture.id, errors }))
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
        const { validation } = this.props;

        return validation ? (
            <div>
                <PriorityHigh onClick={this.handleClickOpen} />
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                >
                    <DialogTitle id="alert-dialog-title">Discrepancies Found</DialogTitle>
                    <DialogContent>
                        {Object.entries(validation).map(([key, reason], i) => (
                            <DialogContentText key={i}>
                                {key}: {reason}
                            </DialogContentText>
                        ))}
                    </DialogContent>
                </Dialog>
            </div>
        ) : null
    }
}

export default AlertDialog;
