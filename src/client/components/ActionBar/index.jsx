import React from 'react';
import PropTypes from 'prop-types';
import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
import { withStyles } from '@material-ui/core/styles';
import FileUploader from './components/FileUploader';
import LatencyField from './components/LatencyField';

const styles = theme => ({
    root: {
        paddingTop: 25,
        paddingBottom: 25,
        height: 100,
    },
});

export class ActionBar extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes } = this.props;
        return (
            <Navbar className={classes.root}>
                <NavbarGroup align={Alignment.LEFT}>
                    <FileUploader />
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <LatencyField />
                </NavbarGroup>
            </Navbar>
        );
    }
}

export default withStyles(styles)(ActionBar);
