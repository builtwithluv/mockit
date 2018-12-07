import React from 'react';
import { Callout, Intent } from '@blueprintjs/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { GlobalContext } from '@client/context';

const styles = {
    definitionList: {
        display: 'flex',
    },
};

export class ValidationError extends React.PureComponent {
    static contextType = GlobalContext;

    render() {
        const { classes } = this.props;
        const { selectedNode, validations } = this.context;
        const errors = validations[selectedNode.id];

        return errors ? (
            <Callout intent={Intent.WARNING} title="Validation Errors">
                {Object.entries(validations[selectedNode.id]).map(([key, error]) => (
                    <dl key={key} className={classes.definitionList}>
                        <dt>{key}</dt>
                        <dd>{error}</dd>
                    </dl>
                ))}
            </Callout>
        ) : null;
    }
}

export default withStyles(styles)(ValidationError);
