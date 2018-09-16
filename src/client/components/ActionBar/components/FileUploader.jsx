import cloneDeep from 'lodash/cloneDeep';

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Input from '@material-ui/core/Input';
import {
    Button,
    Card,
    Checkbox,
    Classes,
    Dialog,
    Spinner,
    TextArea,
} from '@blueprintjs/core';

import { GlobalContext } from '@client/context';

import { unharify } from '@client/helpers';

const styles = theme => ({
    bold: {
        fontWeight: 600,
    },
    fixturePreview: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing.unit,
    },
    fixtureCard: {
        width: '100%',
    },
    fixtureDescription: {
        marginTop: theme.spacing.unit,
        minHeight: 50,
        width: '100%',
        resize: 'none',
    },
    fixtureInputs: {
        width: '100%',
        marginBottom: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

export class FileUploader extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    state = {
        fixturesFromHar: [],
        isUploading: false,
        isDialogOpen: false,
    };

    input;

    render() {
        const { classes } = this.props;

        return (
            <GlobalContext.Consumer>
                {({ toggleSnackbar, updateGlobalContext }) => {
                    this.toggleSnackbar = toggleSnackbar;
                    this.updateGlobalContext = updateGlobalContext;

                    return (
                        <React.Fragment>
                            <Button onClick={this.handleClick}>
                                UPLOAD HAR FILE
                            </Button>
                            <Input
                                className={classes.input}
                                inputRef={ref => { this.input = ref; }}
                                type="file"
                                onChange={this.handleUpload}
                                inputProps={{
                                    'accept': '.har',
                                    'aria-hidden': true,
                                }}
                            />
                            {this.renderDialog()}
                        </React.Fragment>
                    );
                }}
            </GlobalContext.Consumer>
        );
    }

    renderDialog = () => {
        const { classes } = this.props;
        const { fixturesFromHar, isDialogOpen, isUploading } = this.state;

        return (
            <Dialog
                isOpen={isDialogOpen}
                onClose={this.toggleDialog}
                title="Fixtures from HAR"
            >
                <div className={Classes.DIALOG_BODY}>
                    {fixturesFromHar.length > 0 ? (
                        fixturesFromHar.map((fixture, i) => (
                            <div key={i} className={classes.fixturePreview}>
                                <Checkbox
                                    onChange={e => this.updateFixture(i, { isChecked: e.target.checked })}
                                    checked={fixture.isChecked}
                                />
                                <Card className={classes.fixtureCard}>
                                    <React.Fragment>
                                        <span className={classes.bold}>endpoint: </span>
                                        <Input
                                            className={classes.fixtureInputs}
                                            onChange={e => this.updateFixture(i, { url: e.target.value })}
                                            value={fixture.url}
                                        />
                                    </React.Fragment>
                                    <React.Fragment>
                                        <span className={classes.bold}>method: </span>
                                        <Input
                                            className={classes.fixtureInputs}
                                            onChange={e => this.updateFixture(i, { method: e.target.value })}
                                            value={fixture.method}
                                        />
                                    </React.Fragment>
                                    <React.Fragment>
                                        <span className={classes.bold}>status: </span>
                                        <Input
                                            className={classes.fixtureInputs}
                                            onChange={e => this.updateFixture(i, { status: e.target.value })}
                                            value={fixture.status}
                                        />
                                    </React.Fragment>
                                    <React.Fragment>
                                        <span className={classes.bold}>description: </span>
                                        <TextArea
                                            className={classes.fixtureDescription}
                                            onChange={e => this.updateFixture(i, { description: e.target.value })}
                                            value={fixture.description}
                                        />
                                    </React.Fragment>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <p>No mockable requests found</p>
                    )}
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        {fixturesFromHar.length < 1 ? (
                            <Button onClick={this.toggleDialog}>
                                Cancel
                            </Button>
                        ) : (
                            isUploading ? (
                                <Spinner size={Spinner.SIZE_SMALL} />
                            ) : (
                                <Button onClick={this.createFixtures}>
                                    Create Fixtures
                                </Button>
                            )
                        )}
                    </div>
                </div>
            </Dialog>
        );
    }

    createFixtures = () => {
        const { fixturesFromHar } = this.state;

        this.setState({ isUploading: true });

        let snackbarMessage;

        const fixturesToCreate = fixturesFromHar.filter(fixture => fixture.isChecked === true);

        return fetch('/mockit/api/new', {
            method: 'POST',
            body: JSON.stringify(fixturesToCreate),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw 'Failed to upload har file';
                }
                return res.json();
            })
            .then(data => this.updateGlobalContext({ store: data }))
            .then(() => snackbarMessage = `Successfully created ${fixturesToCreate.length} fixtures from .har file`)
            .then(() => this.setState({ isDialogOpen: false }))
            .catch(err => snackbarMessage = err)
            .finally(() => {
                this.toggleSnackbar(snackbarMessage);
                this.setState({ isUploading: false });
            });
    }

    handleClick = () => {
        this.input.click();
    }

    handleUpload = e => {
        const file = e.target.files[0];

        if (file) {
            const r = new FileReader();
            r.onload = e => {
                const fixtures = unharify(JSON.parse(e.target.result));
                this.setState({ isDialogOpen: true, fixturesFromHar: fixtures });
            }
            r.readAsText(file);
            e.target.value = '';
        }
    }

    toggleDialog = () => {
        const { isDialogOpen } = this.state;
        this.setState({ isDialogOpen: !isDialogOpen });
    }

    updateFixture = (idx, next = {}) => {
        const { fixturesFromHar } = this.state;
        const nextFixturesToUpload = cloneDeep(fixturesFromHar);

        nextFixturesToUpload[idx] = {
            ...nextFixturesToUpload[idx],
            ...next,
        };

        this.setState({ fixturesFromHar: nextFixturesToUpload });
    }
}

export default withStyles(styles)(FileUploader);
