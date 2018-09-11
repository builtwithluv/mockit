import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Select } from '@blueprintjs/select';
import { Button, MenuItem } from '@blueprintjs/core';

import { GlobalContext } from '@client/context';

import { NetworkProfile } from '@server/enums';

const styles = theme => ({
    label: {
        marginRight: theme.spacing.unit,
    },
});

export class Throttle extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object,
    };

    state = {
        selectedProfile: Object.values(NetworkProfile)[0],
    };

    render() {
        const { classes } = this.props;
        const { selectedProfile } = this.state;

        return (
            <GlobalContext.Consumer>
                {({ _, updateMockit }) => (
                    <React.Fragment>
                        <label className={classes.label}>
                            Network Profile
                        </label>
                        <Select
                            filterable={false}
                            items={Object.values(NetworkProfile)}
                            itemRenderer={this.renderItem}
                            onItemSelect={profile => {
                                updateMockit({ throttle: profile });
                                this.setState({ selectedProfile: profile });
                            }}
                            popoverProps={{ minimal: true }}
                        >
                            <Button text={selectedProfile} rightIcon="caret-down" />
                        </Select>
                    </React.Fragment>
                )}
            </GlobalContext.Consumer>
        );
    }

    renderItem = (profile, { handleClick, modifiers }) => {
        return (
            <MenuItem
                active={modifiers.active}
                key={profile}
                label={profile}
                onClick={handleClick}
                text={profile}
            />
        );
    }
}

export default withStyles(styles)(Throttle);
