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
    static contextType = GlobalContext;

    state = {
        isOpen: false,
        isSubmitting: false,
        values: getInitialValues(),
    };

    render() {
        const { toggleSnackbar } = this.context;
        const { isOpen, isSubmitting, values } = this.state;

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
                            onChange={() => this.setState({ values: getInitialValues() })}
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
                                        toggleSnackbar={toggleSnackbar}
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
        const { toggleSnackbar, updateGlobalContext } = this.context;
        const { values } = this.state;
        const { data } = values;

        this.setState(() => ({ isSubmitting: true }));

        fetch('/mockit/api/new', {
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
            .then(data => updateGlobalContext({ store: data }))
            .then(() => this.setState(() => ({ isSubmitting: false })))
            .then(() => this.toggleDialog())
            .then(() => toggleSnackbar('Successfully created the new fixture'))
            .catch(() => this.setState(() => ({ isSubmitting: true })))
            .catch(() => toggleSnackbar('Failed to create the new fixture'))
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
