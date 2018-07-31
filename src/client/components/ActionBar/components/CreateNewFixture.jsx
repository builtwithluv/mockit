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

import { GlobalContext } from 'Context';

const styles = theme => ({
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

    updateGlobalContext;

    render() {
        const { classes } = this.props;
        const { isOpen, isSubmitting, values } = this.state;

        return (
            <GlobalContext.Consumer>
                {({ updateGlobalContext }) => {
                    this.updateGlobalContext = updateGlobalContext;
                    return (
                        <div>
                            <Button
                                intent={Intent.SUCCESS}
                                onClick={this.toggleDialog}
                            >
                                NEW
                            </Button>
                            <Dialog
                                canEscapeKeyClose={false}
                                canOutsideClickClose={false}
                                isOpen={isOpen}
                                onClose={() => {
                                    this.toggleDialog();
                                    this.setState(getInitialState());
                                }}
                                title="Create New Fixture"
                            >
                                <div className={Classes.DIALOG_BODY}>
                                    <ControlGroup fill vertical>
                                        <FormGroup
                                            label="Endpoint"
                                            labelFor="url-input"
                                            labelInfo="(required)"
                                        >
                                            <InputGroup
                                                required
                                                id="url-input"
                                                placeholder="/"
                                                value={values.url}
                                                onChange={e => this.handleChange('url', e.target.value)}
                                            />
                                        </FormGroup>
                                        <FormGroup
                                            label="Data"
                                            labelFor="data-input"
                                            labelInfo="(required)"
                                        >
                                            <TextArea
                                                required
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
                                                id="description-input"
                                                className={classes.description}
                                                value={values.description}
                                                onChange={e => this.handleChange('description', e.target.value)}
                                            />
                                        </FormGroup>
                                    </ControlGroup>
                                </div>
                                <div className={Classes.DIALOG_FOOTER}>
                                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                                        {isSubmitting ? (
                                            <Spinner size={Spinner.SIZE_SMALL} />
                                        ) : (
                                            <Button
                                                disabled={!values.url || !values.data}
                                                onClick={this.handleSave}
                                                intent={Intent.PRIMARY}
                                            >
                                                Save
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Dialog>
                        </div>
                    );
                }}
            </GlobalContext.Consumer>
        );
    }

    handleChange = (name, value) => {
        const { values } = this.state;
        const nextValues = { ...values };
        nextValues[name] = value;
        this.setState({ values: nextValues });
    }

    handleSave = () => {
        const { values } = this.state;
        let endpoint = values.url;

        if (endpoint[0] !== '/') {
            endpoint = `/${endpoint}`;
        }

        // INFO Using backend service which needs a full url.
        // On client, only requesting endpoint so just giving it
        // a full path
        const url = `http://localhost${endpoint}`;

        this.setState({ isSubmitting: true });

        fetch('/testy/api/new', {
            method: 'POST',
            body: JSON.stringify({ ...values, url }),
            headers: {
                'content-type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => this.updateGlobalContext({ store: data }))
        .then(() => this.setState({ isSubmitting: false }))
        .then(() => this.toggleDialog())
        .then(() => this.setState(getInitialState()))
        .catch(() => this.setState({ isSubmitting: true }))
        .catch(() => this.setState(getInitialState()))
    }

    toggleDialog = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
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
