import React from 'react';
import PropTypes from 'prop-types';
import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
import withStyles from '@material-ui/core/styles/withStyles';

import CreateNewFixture from './components/CreateNewFixture';
import FileUploader from './components/FileUploader';
import Latency from './components/Latency';
import Throttle from './components/Throttle';

const styles = theme => ({
    root: {
        paddingTop: 15,
        paddingBottom: 15,
        height: 80,
    },
    buttonContainer: {
        marginRight: theme.spacing.unit,
    },
    navRightItem: {
        marginRight: theme.spacing.unit * 3,
    },
});

export class ActionBar extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

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
                    <div className={classes.navRightItem}>
                        <Throttle />
                    </div>
                    <Latency />
                </NavbarGroup>
            </Navbar>
        );
    }
}

export default withStyles(styles)(ActionBar);
