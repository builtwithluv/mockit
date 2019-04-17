import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import { InputGroup } from '@blueprintjs/core';

const styles = theme => ({
    input: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
    },
});

export function FilterInput({ classes, onChange, value }) {
    return (
        <InputGroup
            className={classes.input}
            onChange={e => onChange(e.target.value)}
            placeholder="Filter"
            value={value}
        />
    );
}

export default withStyles(styles)(FilterInput);
