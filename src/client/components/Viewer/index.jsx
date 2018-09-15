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
import CheckCircle from '@material-ui/icons/CheckCircle';
import HighlightOff from '@material-ui/icons/HighlightOff';
import PanoramaFishEye from '@material-ui/icons/PanoramaFishEye';
import withStyles from '@material-ui/core/styles/withStyles';
import Code from 'react-code-prettify';

import {
    getMethodColor,
    getStatusCodeColor,
    validateResponse,
} from '@client/helpers';

const styles = theme => ({
    url: {
        fontWeight: 600,
    },
    marginRight: {
        marginRight: theme.spacing.unit,
    },
});

export class Viewer extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
        fixture: PropTypes.object,
        updateValidations: PropTypes.func,
        updateMockit: PropTypes.func,
        validation: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
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
            updateMockit,
        } = this.props;

        const {
            id,
            method,
            status,
            url,
        } = fixture;

        return (
            <React.Fragment>
                <div className={Classes.ELEVATION_2}>
                    <Navbar data-tag="viewer-action-bar">
                        <NavbarGroup>
                            {this.renderErrorStatus()}
                        </NavbarGroup>
                        <NavbarGroup align={Alignment.RIGHT}>
                            <NavbarHeading>
                                <span
                                    className={classes.marginRight}
                                    style={{ color: getMethodColor(method) }}
                                >
                                    {method}
                                </span>
                                <span
                                    className={classes.marginRight}
                                    style={{ color: getStatusCodeColor(status) }}
                                >
                                    {status}
                                </span>
                                <span className={classes.url}>{url}</span>
                            </NavbarHeading>
                            <NavbarDivider />
                            <Button
                                data-tag="viewer-action-bar-set-active-btn"
                                intent={Intent.PRIMARY}
                                text="Set Active"
                                onClick={() => updateMockit({ id })}
                            />
                        </NavbarGroup>
                    </Navbar>
                </div>
                <div className={Classes.ELEVATION_2} data-tag="viewer-code">
                    {this.renderCodeString()}
                </div>
            </React.Fragment>
        );
    }

    renderErrorStatus = () => {
        const { validation } = this.props;
        if (validation === undefined) {
            return <Spinner size={Spinner.SIZE_SMALL} />;
        } else if (validation) {
            return <HighlightOff style={{ color: Colors.RED4 }} />;
        } else if (validation === null) {
            return <CheckCircle style={{ color: Colors.GREEN4 }} />;
        } else {
            return <PanoramaFishEye />;
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
        return beautify(`const handler = ${_handler};`);
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
