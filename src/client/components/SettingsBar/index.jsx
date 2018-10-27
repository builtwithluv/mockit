import React from 'react';
import PropTypes from 'prop-types';
import {
    Alignment,
    Button,
    Menu,
    MenuDivider,
    MenuItem,
    Navbar,
    NavbarGroup,
    Popover,
    Position,
} from '@blueprintjs/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { Storage, Theme } from '@client/enums';
import { mockitStorage } from '@client/helpers';
import { GlobalContext } from '@/client/context';

const styles = () => ({
    root: {
        height: 50,
    },
});

export class SettingsBar extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object,
    };

    static contextType = GlobalContext;

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
        const { theme, useLastSavedActiveFixtures } = this.context;
        return (
            <Menu>
                <MenuItem
                    icon={theme === Theme.DARK ? 'small-tick' : 'blank'}
                    text="Dark"
                    onClick={this.updateTheme}
                />
                <MenuDivider />
                <MenuItem
                    icon={useLastSavedActiveFixtures ? 'small-tick' : 'blank'}
                    text="Use last saved active fixtures"
                    onClick={this.updateLastUseActiveFixturesStorageSettings}
                />
            </Menu>
        );
    }

    updateLastUseActiveFixturesStorageSettings = () => {
        const { updateGlobalContext, useLastSavedActiveFixtures } = this.context;
        const nextuseLastSavedActiveFixtures = !useLastSavedActiveFixtures;
        updateGlobalContext({ useLastSavedActiveFixtures: nextuseLastSavedActiveFixtures });
        mockitStorage.setItem(Storage.USE_LAST_SAVED_ACTIVE_FIXTURES, nextuseLastSavedActiveFixtures);
    }

    updateTheme = () => {
        const { theme, updateGlobalContext } = this.context;
        const nextTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        updateGlobalContext({ theme: nextTheme });
        mockitStorage.setItem(Storage.THEME, nextTheme);
    }
}

export default withStyles(styles)(SettingsBar);
