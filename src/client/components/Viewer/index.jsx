import beautify from 'js-beautify';

import React from 'react';
import PropTypes from 'prop-types';
import {
    Alignment,
    Button,
    Classes,
    Colors,
    Intent,
    Navbar,
    NavbarGroup,
    NavbarDivider,
    NavbarHeading,
    Spinner,
} from '@blueprintjs/core';
import PriorityHigh from '@material-ui/icons/PriorityHigh';
import { withStyles } from '@material-ui/core';
import Code from 'react-code-prettify';

import { validateResponse } from '@client/common/helpers';

const styles = () => ({
    url: {
        fontWeight: 600,
    },
});

export class Viewer extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
        fixture: PropTypes.object,
        updateValidations: PropTypes.func,
        updateTesty: PropTypes.func,
        validation: PropTypes.object,
    };

    componentDidMount() {
        this.checkDataSameness();
    }

    componentDidUpdate() {
        const { validation } = this.props;
        if (validation === undefined) {
            this.checkDataSameness();
        }
    }

    render() {
        const {
            classes,
            fixture,
            updateTesty,
        } = this.props;

        const {
            id,
            method,
            url,
        } = fixture;

        return (
            <div>
                <div className={Classes.ELEVATION_2}>
                    <Navbar>
                        <NavbarGroup>
                            {this.renderErrorStatus()}
                        </NavbarGroup>
                        <NavbarGroup align={Alignment.RIGHT}>
                            <NavbarHeading>
                                {method} <span className={classes.url}>{url}</span>
                            </NavbarHeading>
                            <NavbarDivider />
                            <Button
                                intent={Intent.PRIMARY}
                                text="Set Active"
                                onClick={() => updateTesty({ id })}
                            />
                        </NavbarGroup>
                    </Navbar>
                </div>
                <div className={Classes.ELEVATION_2}>
                    {this.renderCodeString()}
                </div>
            </div>
        );
    }

    renderErrorStatus = () => {
        const { validation } = this.props;
        if (validation === undefined) {
            return <Spinner size={Spinner.SIZE_SMALL} />;
        } else if (validation) {
            return <PriorityHigh style={{ color: Colors.RED4 }} />;
        } else {
            return null;
        }
    }

    renderCodeString = () => {
        const {
            fixture: {
                data,
                _handler,
            },
        } = this.props;

        let codeString;

        if (data) {
            codeString = this.generateDataString();
        } else if (_handler) {
            codeString = this.generateHandlerString();
        }

        return codeString && <Code language="javascript" codeString={codeString} />;
    }

    generateHandlerString = () => {
        const { fixture: { _handler } } = this.props;
        return beautify(`const handler = ${_handler}`);
    }

    generateDataString = () => {
        const {
            fixture: {
                data,
            },
            validation,
        } = this.props;

        return beautify(`
            ${validation ? `const validationErrors = ${JSON.stringify(validation)};` : ''}

            const data = ${JSON.stringify(data)};
        `);
    }

    checkDataSameness = () => {
        const { fixture, updateValidations } = this.props;
        validateResponse(fixture)
            .then(errors => updateValidations(fixture.id, errors))
            .catch(errors => updateValidations(fixture.id, errors));
    }
}

export default withStyles(styles)(Viewer);
