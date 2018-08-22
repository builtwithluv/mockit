import React from 'react';
import {
    Button,
    Classes,
    Dialog,
    Intent,
    Spinner,
    Tabs,
    Tab,
} from '@blueprintjs/core';

import { GlobalContext } from '@client/context';

import CustomForm from './CustomForm';
import ApiForm from '@/client/components/ActionBar/components/ApiForm';

export class CreateNewFixture extends React.Component {
    state = {
        isOpen: false,
        isSubmitting: false,
        values: getInitialValues(),
    };

    toggleSnackbar;
    updateGlobalContext;

    render() {
        const { isOpen, isSubmitting, values } = this.state;

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
                                onClose={this.toggleDialog}
                                title="Create New Fixture"
                            >
                                <div className={Classes.DIALOG_BODY}>
                                    <Tabs
                                        large
                                        renderActiveTabPanelOnly
                                        id="fix-types"
                                        onChange={() => this.setState({ values: getInitialValues()})}
                                    >
                                        <Tab
                                            id="cus"
                                            title="Custom"
                                            panel={
                                                <CustomForm
                                                    handleChange={this.handleChange}
                                                    values={values}
                                                />
                                            }
                                        />
                                        <Tab
                                            id="url"
                                            title="URL"
                                            panel={
                                                <ApiForm
                                                    handleChange={this.handleChange}
                                                    toggleSnackbar={this.toggleSnackbar}
                                                    values={values}
                                                />
                                            }
                                        />
                                    </Tabs>
                                </div>
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
                            </Dialog>
                        </React.Fragment>
                    );
                }}
            </GlobalContext.Consumer>
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

        this.setState(() => ({ isSubmitting: true }));

        fetch('/testy/api/new', {
            method: 'POST',
            body: JSON.stringify([{
                ...values,
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
            .finally(() => this.setState(() => ({ values: getInitialValues() })));
    }

    toggleDialog = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }
}

function getInitialValues() {
    return {
        data: '',
        description: '',
        method: 'GET',
        url: '',
        status: '200',
    };
}

export default CreateNewFixture;
