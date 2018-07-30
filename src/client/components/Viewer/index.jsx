import beautify from 'js-beautify';

import React from 'react';
import PropTypes from 'prop-types';
import {
    Alignment,
    Button,
    Classes,
    Colors,
    Navbar,
    NavbarGroup,
    NavbarDivider,
    NavbarHeading,
    Text,
    Tooltip,
} from '@blueprintjs/core';
import PriorityHigh from '@material-ui/icons/PriorityHigh';
import { withStyles } from '@material-ui/core';
import Code from 'react-code-prettify';
import { StoreContext } from 'Context';

import validateResponse from 'Helpers/validateResponse';

const styles = theme => ({
    url: {
        fontWeight: 600,
    },
});

export class Viewer extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
    };

    updater;
    updateTesty;

    setActive = id => {
        this.updateTesty({ id });
    }

    checkDataSameness = fixture => {
        validateResponse(fixture)
            .then(errors => this.updater({ validations: { ...this.validations, [fixture.id]: errors }}))
            .catch(errors => this.updater({ validations: { ...this.validations, [fixture.id]: errors }}));
    }

    hasBeenValidated = validation => {
        return validation || validation === null;
    }

    isValid = errors => {
        return errors === null;
    }

    render() {
        const { classes } = this.props;

        return (
            <StoreContext.Consumer>
                {({ selectedFixture, store, updateTesty, updateStoreContext, validations }) => {
                    if (!selectedFixture) {
                        return null;
                    }

                    this.updateTesty = updateTesty;
                    this.validations = validations;
                    this.updater = updateStoreContext;

                    const fixture = store.fixtures.find(fixture => fixture.id === selectedFixture.id);
                    const data = fixture.data;
                    const handler = fixture.handler;
                    const validation = validations[fixture.id];

                    if (!this.hasBeenValidated(validation)) {
                        this.checkDataSameness(fixture);
                    }

                    const validationErrorString = `${!this.isValid(validation) ? `const validationErrors = ${JSON.stringify(validation)};` : ''} \n\n const data = ${JSON.stringify(data)}`;

                    return (
                        <div>
                            <div className={Classes.ELEVATION_2}>
                                <Navbar>
                                    {!this.isValid(validation) && (
                                        <NavbarGroup>
                                            <PriorityHigh style={{ color: Colors.RED4 }} />
                                        </NavbarGroup>
                                    )}
                                    <NavbarGroup align={Alignment.RIGHT}>
                                        <NavbarHeading>{fixture.method} <span className={classes.url}>{fixture.url}</span></NavbarHeading>
                                        <NavbarDivider />
                                        <Button text="Set Active" onClick={() => this.setActive(fixture.id)} />
                                    </NavbarGroup>
                                </Navbar>
                            </div>
                            <div className={Classes.ELEVATION_2}>
                                {data ? (
                                    <Code language="javascript" codeString={beautify(validationErrorString)} />
                                ) : (
                                    <Code language="javascript" codeString={handler} />
                                )}
                            </div>
                        </div>
                    );
                }}
            </StoreContext.Consumer>
        );
    }
}

export default withStyles(styles)(Viewer);
