import get from 'lodash/get';
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
    findFixture,
    getMethodColor,
    getStatusCodeColor,
    validateResponse,
} from '@client/helpers';
import { GlobalContext } from '@client/context';

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
    };

    static contextType = GlobalContext;

    componentDidMount() {
        this.checkDataSameness();
    }

    componentDidUpdate() {
        const errors = this.getValidationErrors();

        if (errors === undefined) {
            this.checkDataSameness();
        }
    }

    render() {
        const { classes } = this.props;
        const { updateMockit } = this.context;
        const fixture = this.getSelectedFixture();

        return fixture ? (
            <React.Fragment>
                <div className={Classes.ELEVATION_2}>
                    <Navbar data-tag="viewer-action-bar">
                        <NavbarGroup>
                            <Button
                                data-tag="viewer-action-bar-set-active-btn"
                                intent={Intent.PRIMARY}
                                text="Set Active"
                                onClick={() => updateMockit({ id: fixture.id })}
                            />
                            <NavbarDivider />
                            <NavbarHeading>
                                <span
                                    className={classes.marginRight}
                                    style={{ color: getMethodColor(fixture.method) }}
                                >
                                    {fixture.method}
                                </span>
                                <span
                                    className={classes.marginRight}
                                    style={{ color: getStatusCodeColor(fixture.status) }}
                                >
                                    {fixture.status}
                                </span>
                                <span className={classes.url}>{fixture.url}</span>
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
        ) : null;
    }

    checkDataSameness = () => {
        const { updateValidations } = this.context;
        const fixture = this.getSelectedFixture();

        if (!fixture) {
            return;
        }

        validateResponse(fixture)
            .then(errors => updateValidations(fixture.id, errors))
            .catch(errors => updateValidations(fixture.id, errors));
    }

    getValidationErrors = () => {
        const { selectedNode, validations } = this.context;
        return validations[get(selectedNode, 'id')];
    }

    getSelectedFixture = () => {
        const {
            selectedNode,
            store: { fixtures },
        } = this.context;

        return findFixture(get(selectedNode, 'id'), fixtures);
    }

    renderErrorStatus = () => {
        const errors = this.getValidationErrors();

        if (errors === undefined) {
            return <Spinner size={Spinner.SIZE_SMALL} />;
        } else if (errors) {
            return <Icon icon="warning-sign" intent={Intent.WARNING} />;
        } else if (errors === null) {
            return <Icon icon="tick-circle" intent={Intent.SUCCESS} />;
        } else {
            return <Icon icon="circle" />;
        }
    }
}

export default withStyles(styles)(Viewer);
