import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import withStyles from '@material-ui/core/styles/withStyles';
import {
    ControlGroup,
    FormGroup,
    InputGroup,
    TextArea,
} from '@blueprintjs/core';

import 'brace/mode/json';
import 'brace/theme/github';

const styles = () => ({
    description: {
        minHeight: 100,
        width: '100%',
        resize: 'none',
        overflowY: 'scroll',
    },
});

export class CustomForm extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
        handleChange: PropTypes.func,
        values: PropTypes.object,
    };

    render() {
        const { classes, handleChange, values } = this.props;

        return (
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
                        onChange={e => handleChange('url', e.target.value)}
                    />
                </FormGroup>
                <FormGroup
                    label="Data (JSON)"
                    labelFor="data-input"
                >
                    <AceEditor
                        enableBasicAutocompletion
                        enableLiveAutocompletion
                        name="actionbar-new-dialog-custom-data"
                        mode="json"
                        theme="github"
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
                        height="150px"
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
            </ControlGroup>
        );
    }
}

export default withStyles(styles)(CustomForm);
