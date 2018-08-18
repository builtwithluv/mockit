import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Classes,
    ControlGroup,
    Dialog,
    FormGroup,
    InputGroup,
    Intent,
    Spinner,
    TextArea,
} from '@blueprintjs/core';

import { GlobalContext } from '@client/context';

const styles = () => ({
    description: {
        minHeight: 100,
        width: '100%',
        resize: 'none',
        overflowY: 'scroll',
    },
    data: {
        minHeight: 200,
        width: '100%',
        resize: 'none',
        overflowY: 'scroll',
    },
});

export class CreateNewFixture extends React.Component {
    state = getInitialState();

    toggleSnackbar;
    updateGlobalContext;

    render() {
        const { isOpen } = this.state;

        return (
            <GlobalContext.Consumer>
                {({ toggleSnackbar, updateGlobalContext }) => {
                    this.toggleSnackbar = toggleSnackbar;
                    this.updateGlobalContext = updateGlobalContext;

                    return (
                        <React.Fragment>
                            <Button
                                data-tag="actionbar-new-open-btn"
                                intent={Intent.SUCCESS}
                                onClick={this.toggleDialog}
                            >
                                NEW
                            </Button>
                            <Dialog
                                data-tag="actionbar-new-dialog"
                                isOpen={isOpen}
                                onClose={() => {
                                    this.toggleDialog();
                                    this.setState(() => getInitialState());
                                }}
                                title="Create New Fixture"
                            >
                                {this.renderDialogBody()}
                                {this.renderDialogFooter()}
                            </Dialog>
                        </React.Fragment>
                    );
                }}
            </GlobalContext.Consumer>
        );
    }

    renderDialogBody = () => {
        const { values } = this.state;
        const { classes } = this.props;

        return (
            <div className={Classes.DIALOG_BODY}>
                <ControlGroup fill vertical>
                    <FormGroup
                        label="Endpoint"
                        labelFor="url-input"
                        labelInfo="(required)"
                    >
                        <InputGroup
                            required
                            data-tag="actionbar-new-dialog-url"
                            id="url-input"
                            placeholder="/"
                            value={values.url}
                            onChange={e => this.handleChange('url', e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Data"
                        labelFor="data-input"
                    >
                        <TextArea
                            data-tag="actionbar-new-dialog-data"
                            id="data-input"
                            className={classes.data}
                            placeholder="{ }"
                            value={values.data}
                            onChange={e => this.handleChange('data', e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Method"
                        labelFor="method-input"
                    >
                        <InputGroup
                            data-tag="actionbar-new-dialog-method"
                            id="method-input"
                            placeholder="GET"
                            value={values.method}
                            onChange={e => this.handleChange('method', e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Status"
                        labelFor="status-input"
                    >
                        <InputGroup
                            data-tag="actionbar-new-dialog-status"
                            id="status-input"
                            placeholder="200"
                            type="number"
                            value={values.status}
                            onChange={e => this.handleChange('status', e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup
                        label="ID"
                        labelFor="id-input"
                    >
                        <InputGroup
                            data-tag="actionbar-new-dialog-id"
                            id="id-input"
                            value={values.id}
                            onChange={e => this.handleChange('id', e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Filename"
                        labelFor="filename-input"
                    >
                        <InputGroup
                            data-tag="actionbar-new-dialog-filename"
                            id="filename-input"
                            value={values.filename}
                            onChange={e => this.handleChange('filename', e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Description"
                        labelFor="description-input"
                    >
                        <TextArea
                            data-tag="actionbar-new-dialog-description"
                            id="description-input"
                            className={classes.description}
                            value={values.description}
                            onChange={e => this.handleChange('description', e.target.value)}
                        />
                    </FormGroup>
                </ControlGroup>
            </div>
        );
    }

    renderDialogFooter = () => {
        const { isSubmitting, values } = this.state;
        return (
            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    {isSubmitting ? (
                        <Spinner size={Spinner.SIZE_SMALL} />
                    ) : (
                        <Button
                            data-tag="actionbar-new-dialog-save-btn"
                            disabled={!values.url}
                            onClick={this.handleSave}
                            intent={Intent.PRIMARY}
                        >
                            Save
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    handleChange = (name, value) => {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                [name]: value,
            },
        }));
    }

    handleSave = () => {
        const { values } = this.state;
        const { data } = values;
        let { url } = values;

        if (url[0] !== '/') {
            url = `/${url}`;
        }

        // INFO Using backend service which needs a full url.
        // On client, only requesting endpoint so just giving it
        // a full path
        url = `http://localhost${url}`;

        this.setState(() => ({ isSubmitting: true }));

        fetch('/testy/api/new', {
            method: 'POST',
            body: JSON.stringify([{
                ...values,
                url,
                data: data ? JSON.parse(data) : null,
            }]),
            headers: {
                'content-type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => this.updateGlobalContext({ store: data }))
        .then(() => this.setState(() => ({ isSubmitting: false })))
        .then(() => this.toggleDialog())
        .then(() => this.toggleSnackbar('Successfully created the new fixture'))
        .catch(() => this.setState(() => ({ isSubmitting: true })))
        .catch(() => this.toggleSnackbar('Failed to create the new fixture'))
        .finally(() => this.setState(() => getInitialState()));
    }

    toggleDialog = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }
}

function getInitialState() {
    return {
        isOpen: false,
        isSubmitting: false,
        values: {
            id: '',
            data: '',
            description: '',
            url: '',
            filename: '',
            method: 'GET',
            status: '200',
        },
    };
}

export default withStyles(styles)(CreateNewFixture);
