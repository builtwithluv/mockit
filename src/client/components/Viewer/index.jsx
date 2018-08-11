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

import {
    findFixture,
    generateDataString,
    generateHandlerString,
    validateResponse,
} from '@client/common/helpers';

const styles = theme => ({
    url: {
        fontWeight: 600,
    },
});

export class Viewer extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
        fixtures: PropTypes.arrayOf(PropTypes.object),
        selectedNode: PropTypes.object,
        updateGlobalContext: PropTypes.func,
        updateTesty: PropTypes.func,
        validations: PropTypes.object,
    };

    errors;
    fixture;

    componentDidUpdate() {
        const { selectedNode, validations } = this.props;
        const validation = validations[selectedNode.id];

        if (validation === null || validation) {
            return;
        }

        this.checkDataSameness();
    }

    render() {
        const {
            classes,
            fixtures,
            selectedNode,
            updateTesty,
            validations,
        } = this.props;

        if (!selectedNode) {
            return null;
        }

        this.fixture = findFixture(selectedNode.id, fixtures);

        if (!this.fixture) {
            return null;
        }

        const {
            id,
            data,
            _handler,
            method,
            url,
        } = this.fixture;

        this.errors = validations[id];

        return (
            <div>
                <div className={Classes.ELEVATION_2}>
                    <Navbar>
                        <NavbarGroup>
                            {this.renderErrorStatus()}
                        </NavbarGroup>
                        <NavbarGroup align={Alignment.RIGHT}>
                            <NavbarHeading>{method} <span className={classes.url}>{url}</span></NavbarHeading>
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
                    {data ? (
                        <Code language="javascript" codeString={beautify(generateDataString(data, this.errors))} />
                    ) : (
                        <Code language="javascript" codeString={generateHandlerString(_handler)} />
                    )}
                </div>
            </div>
        );
    }

    renderErrorStatus = () => {
        if (this.errors === undefined) {
            return <Spinner size={Spinner.SIZE_SMALL} />;
        } else if (this.errors) {
            return <PriorityHigh style={{ color: Colors.RED4 }} />;
        } else {
            return null;
        }
    }

    checkDataSameness = () => {
        const { updateGlobalContext, validations } = this.props;
        validateResponse(this.fixture)
            .then(errors => updateGlobalContext({ validations: { ...validations, [this.fixture.id]: errors } }))
            .catch(errors => updateGlobalContext({ validations: { ...validations, [this.fixture.id]: errors } }));
    }
}

export default withStyles(styles)(Viewer);
