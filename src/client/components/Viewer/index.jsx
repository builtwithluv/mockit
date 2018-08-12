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
    generateDataString,
    generateHandlerString,
    validateResponse,
} from '@client/common/helpers';

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
            validation,
        } = this.props;

        const {
            id,
            data,
            _handler,
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
                    {data ? (
                        <Code language="javascript" codeString={beautify(generateDataString(data, validation))} />
                    ) : (
                        <Code language="javascript" codeString={beautify(generateHandlerString(_handler))} />
                    )}
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

    checkDataSameness = () => {
        const { fixture, updateValidations } = this.props;
        validateResponse(fixture)
            .then(errors => updateValidations(fixture.id, errors))
            .catch(errors => updateValidations(fixture.id, errors));
    }
}

export default withStyles(styles)(Viewer);
