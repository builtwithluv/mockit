import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ErrorInfo from 'Components/ErrorInfo';

import { StoreContext } from 'Context';

const styles = theme => ({
    container: {
        display: 'flex',
    },
    statusMargin: {
        marginRight: theme.spacing.unit,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
    },
});

export class Description extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        fixture: PropTypes.object.isRequired,
    };

    render() {
        const {
            fixture,
            classes,
        } = this.props;

        const { description } = fixture;

        return (
            <StoreContext.Consumer>
                {({ validations, handlers }) => (
                    <div className={classes.container}>
                        <div className={classes.statusMargin}>
                            <ErrorInfo
                                fixture={fixture}
                                setValidation={handlers.setValidation}
                                validation={validations[fixture.id]}
                            />
                        </div>
                        <Typography className={classes.secondaryHeading}>
                            {description}
                        </Typography>
                    </div>
                )}
            </StoreContext.Consumer>
        );
    }
}

export default withStyles(styles)(Description);
