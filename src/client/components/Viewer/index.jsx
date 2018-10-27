import React from 'react';
import PropTypes from 'prop-types';
import {
    Alignment,
    Button,
    Classes,
    Icon,
    Intent,
    Navbar,
    NavbarGroup,
    NavbarDivider,
    NavbarHeading,
    Spinner,
    Text,
} from '@blueprintjs/core';
import withStyles from '@material-ui/core/styles/withStyles';
import CodePreview from './components/CodePreview';
import ValidationError from './components/ValidationError';

import {
    getMethodColor,
    getStatusCodeColor,
    validateResponse,
} from '@client/helpers';

const styles = theme => ({
    descriptionContainer: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    url: {
        fontWeight: 600,
    },
    marginRight: {
        marginRight: theme.spacing.unit,
    },
    validationsContainer: {
        marginBottom: theme.spacing.unit,
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
                            <Button
                                data-tag="viewer-action-bar-set-active-btn"
                                intent={Intent.PRIMARY}
                                text="Set Active"
                                onClick={() => updateMockit({ id })}
                            />
                            <NavbarDivider />
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
                        </NavbarGroup>
                        <NavbarGroup align={Alignment.RIGHT}>
                            {this.renderErrorStatus()}
                        </NavbarGroup>
                    </Navbar>
                </div>
                <div className={classes.descriptionContainer}>
                    <Text>{fixture.description}</Text>
                </div>
                <div className={classes.validationsContainer}>
                    <ValidationError />
                </div>
                <CodePreview />
            </React.Fragment>
        );
    }

    renderErrorStatus = () => {
        const { validation } = this.props;
        if (validation === undefined) {
            return <Spinner size={Spinner.SIZE_SMALL} />;
        } else if (validation) {
            return <Icon icon="warning-sign" intent={Intent.WARNING} />;
        } else if (validation === null) {
            return <Icon icon="tick-circle" intent={Intent.SUCCESS} />;
        } else {
            return <Icon icon="circle" />;
        }
    }

    checkDataSameness = () => {
        const { fixture, updateValidations } = this.props;
        validateResponse(fixture)
            .then(errors => updateValidations(fixture.id, errors))
            .catch(errors => updateValidations(fixture.id, errors));
    }
}

export default withStyles(styles)(Viewer);
