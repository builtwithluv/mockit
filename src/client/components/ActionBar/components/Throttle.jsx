import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Colors } from '@blueprintjs/core';

import { GlobalContext } from '@client/context';
import { Theme } from '@client/enums/theme';

import { NetworkProfile } from '@server/enums';

const styles = theme => ({
    label: {
        marginRight: theme.spacing.unit,
    },
    inputLabelDark: {
        color: Colors.WHITE,
    },
});

export class Throttle extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object,
    };

    render() {
        const { classes } = this.props;

        return (
            <GlobalContext.Consumer>
                {({ store, theme, updateMockit }) => (
                    <React.Fragment>
                        <FormControl error>
                            <InputLabel htmlFor="throttle-input">Throttle</InputLabel>
                            <Select
                                className={theme === Theme.DARK && classes.inputLabelDark}
                                value={store.throttle}
                                onChange={e => updateMockit({ throttle: e.target.value })}
                                inputProps={{
                                    name: 'throttle',
                                    id: 'throttle-input',
                                }}
                            >
                                {Object.values(NetworkProfile).map(val => (
                                    <MenuItem key={val} value={val}>{val}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </React.Fragment>
                )}
            </GlobalContext.Consumer>
        );
    }
}

export default withStyles(styles)(Throttle);
