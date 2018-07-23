import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FileUpload from '@material-ui/icons/FileUpload';
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

    input;

    handleClick = () => {
        this.input.click();
    }

    handleUpload = (evt, toggleSnackbar) => {
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
                })
                .catch(err => toggleSnackbar(err));
            }
            r.readAsText(file);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <StoreContext.Consumer>
                {({ handlers }) => (
                    <div>
                        <Button
                            variant="contained"
                            color="default"
                            onClick={this.handleClick}
                        >
                            Upload har file
                            <FileUpload className={classes.rightIcon} />
                        </Button>
                        <Input
                            className={classes.input}
                            inputRef={ref => { this.input = ref; }}
                            type="file"
                            onChange={e => this.handleUpload(e, handlers.toggleSnackbar)}
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
