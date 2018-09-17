import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import withStyles from '@material-ui/core/styles/withStyles';
import {
    Button,
    ControlGroup,
    FormGroup,
    InputGroup,
    Spinner,
    TextArea,
} from '@blueprintjs/core';

import 'brace/mode/json';
import 'brace/theme/github';

const styles = theme => ({
    description: {
        minHeight: 100,
        width: '100%',
        resize: 'none',
        overflowY: 'scroll',
    },
    tryBtn: {
        marginBottom: theme.spacing.unit * 1.5,
    },
});

export class ApiForm extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
        handleChange: PropTypes.func,
        toggleSnackbar: PropTypes.func,
        values: PropTypes.object,
    };

    state = {
        apiUrl: '',
        options: '',
        isRequesting: false,
    };

    render() {
        const { classes } = this.props;
        const { apiUrl, isRequesting, options } = this.state;

        return (
            <React.Fragment>
                <ControlGroup fill vertical>
                    <FormGroup
                        label="API"
                        labelFor="api-input"
                        labelInfo="(required)"
                    >
                        <InputGroup
                            required
                            data-tag="actionbar-new-dialog-api-url"
                            id="api-input"
                            value={apiUrl}
                            onChange={e => this.handleSearchChange(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Fetch API Options (JSON)"
                        labelFor="options-input"
                    >
                        <AceEditor
                            enableBasicAutocompletion
                            enableLiveAutocompletion
                            mode="json"
                            theme="github"
                            name="actionbar-new-dialog-api-options"
                            onChange={this.handleOptionsChange}
                            fontSize={14}
                            showPrintMargin={false}
                            showGutter={false}
                            value={options}
                            setOptions={{
                                showLineNumbers: false,
                                tabSize: 2,
                            }}
                            width="100%"
                            height="150px"
                        />
                    </FormGroup>
                </ControlGroup>
                {isRequesting ? (
                    <Spinner size={Spinner.SIZE_SMALL} />
                ) : (
                    <Button
                        className={classes.tryBtn}
                        data-tag="actionbar-new-dialog-api-btn"
                        onClick={this.handleClick}
                    >
                        Try
                    </Button>
                )}
                {this.renderSearchValues()}
            </React.Fragment>
        );
    }

    handleClick = () => {
        const { apiUrl } = this.state;
        const { handleChange, toggleSnackbar } = this.props;
        let { options }  = this.state;

        options = options ? JSON.parse(options) : {};

        this.setState(() => ({ isRequesting: true }));

        fetch(apiUrl, options)
            .then(res => {
                handleChange('url', res.url);
                handleChange('status', res.status);
                handleChange('validator', { url: apiUrl, ...options });
                return res.json();
            })
            .then(data => {
                handleChange('data', JSON.stringify(data));
                handleChange('method', options.method || 'GET')
            })
            .catch(() => {
                toggleSnackbar('Failed to make request');
            })
            .finally(() => this.setState(() => ({ isRequesting: false })));
    }

    handleOptionsChange = options => {
        this.setState(() => ({ options }));
    }

    handleSearchChange = apiUrl => {
        this.setState(() => ({ apiUrl }));
    }

    renderSearchValues = () => {
        const { classes, handleChange, values } = this.props;

        return (
            <React.Fragment>
                <FormGroup
                    label="Data (JSON)"
                    labelFor="data-input"
                >
                    <AceEditor
                        enableBasicAutocompletion
                        enableLiveAutocompletion
                        mode="json"
                        theme="github"
                        name="actionbar-new-dialog-api-data"
                        onLoad={this.onLoad}
                        onChange={val => handleChange('data', val)}
                        fontSize={14}
                        showPrintMargin={false}
                        showGutter={false}
                        value={values.data}
                        setOptions={{
                            showLineNumbers: false,
                            tabSize: 2,
                        }}
                        width="100%"
                        height="250px"
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
                        onChange={e => handleChange('method', e.target.value)}
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
                        onChange={e => handleChange('status', e.target.value)}
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
                        onChange={e => handleChange('description', e.target.value)}
                    />
                </FormGroup>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ApiForm);
