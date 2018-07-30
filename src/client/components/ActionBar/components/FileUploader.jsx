import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Spinner } from '@blueprintjs/core';
import Input from '@material-ui/core/Input';

import { StoreContext } from 'Context';

const styles = theme => ({
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    input: {
        display: 'none',
    }
});

export class FileUploader extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    state = {
        isUploading: false,
    };

    input;

    handleClick = () => {
        this.input.click();
    }

    handleUpload = (evt, toggleSnackbar, updateStoreContext, nextStoreData) => {
        this.setState({ isUploading: true });

        const file = evt.target.files[0];

        if (file) {
            const r = new FileReader();
            r.onload = e => {
                fetch('/testy/api/harUpload', {
                    method: 'POST',
                    body: e.target.result,
                    headers: {
                        'content-type': 'application/json',
                    },
                })
                .then(res => {
                    if (!res.ok) {
                        throw 'Failed to upload har file';
                    }
                    toggleSnackbar('Successfully created fixtures from har file');
                    return res.json();
                })
                .then(data => updateStoreContext(nextStoreData(data)))
                .then(() => this.setState({ isUploading: false }))
                .catch(err => toggleSnackbar(err))
                .catch(() => this.setState({ isUploading: false }));
            }
            r.readAsText(file);
        }
    }

    render() {
        const { classes } = this.props;
        const { isUploading } = this.state;

        return (
            <StoreContext.Consumer>
                {({ handlers, updateStoreContext, nextStoreData }) => (
                    <div>
                        {isUploading ? (
                            <Spinner size={Spinner.SIZE_SMALL} />
                        ) : (
                            <Button onClick={this.handleClick}>
                                UPLOAD HAR FILE
                            </Button>
                        )}
                        <Input
                            className={classes.input}
                            inputRef={ref => { this.input = ref; }}
                            type="file"
                            onChange={e => this.handleUpload(e, handlers.toggleSnackbar, updateStoreContext, nextStoreData)}
                            inputProps={{
                                'accept': '.har',
                                'aria-hidden': true,
                            }}
                        />
                    </div>
                )}
            </StoreContext.Consumer>
        );
    }
}

export default withStyles(styles)(FileUploader);
