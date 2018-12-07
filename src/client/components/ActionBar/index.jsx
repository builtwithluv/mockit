import React from 'react';
import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
import withStyles from '@material-ui/core/styles/withStyles';

import CreateNewFixture from './components/CreateNewFixture';
import FileUploader from './components/FileUploader';
import Latency from './components/Latency';

const styles = theme => ({
    root: {
        paddingTop: 15,
        paddingBottom: 15,
        height: 80,
    },
    buttonContainer: {
        marginRight: theme.spacing.unit,
    },
});

export class ActionBar extends React.PureComponent {
    render() {
        const { classes } = this.props;
        return (
            <Navbar
                data-tag="actionbar"
                className={classes.root}
            >
                <NavbarGroup align={Alignment.LEFT}>
                    <div className={classes.buttonContainer}>
                        <CreateNewFixture />
                    </div>
                    <FileUploader />
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Latency />
                </NavbarGroup>
            </Navbar>
        );
    }
}

export default withStyles(styles)(ActionBar);
