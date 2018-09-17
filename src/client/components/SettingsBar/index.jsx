import React from 'react';
import PropTypes from 'prop-types';
import {
    Alignment,
    Button,
    Menu,
    MenuItem,
    Navbar,
    NavbarGroup,
    Popover,
    Position,
} from '@blueprintjs/core';
import withStyles from '@material-ui/core/styles/withStyles';

import { Theme } from '@client/enums/theme';

const styles = () => ({
    root: {
        height: 50,
    },
});

export class SettingsBar extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object,
        updateGlobalContext: PropTypes.func,
    };

    render() {
        const { classes } = this.props;

        return (
            <Navbar
                data-tag="settings-bar"
                className={classes.root}
            >
                <NavbarGroup align={Alignment.RIGHT}>
                    <Popover
                        content={this.renderMenu()}
                        position={Position.BOTTOM}
                    >
                        <Button minimal icon="cog" />
                    </Popover>
                </NavbarGroup>
            </Navbar>
        );
    }

    renderMenu = () => {
        const { updateGlobalContext } = this.props;

        return (
            <Menu>
                <li className="bp3-menu-header">
                    <h6 className="bp3-heading">Theme</h6>
                </li>
                <MenuItem
                    text="Dark"
                    onClick={() => updateGlobalContext({ theme: Theme.DARK })}
                />
                <MenuItem
                    text="Light"
                    onClick={() => updateGlobalContext({ theme: Theme.LIGHT })}
                />
            </Menu>
        );
    }
}

export default withStyles(styles)(SettingsBar);
