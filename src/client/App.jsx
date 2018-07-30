import './app.css';

import { debounce } from 'lodash';
import classNames from 'classnames';

import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { StoreContext } from 'Context';

import ActionBar from 'Components/ActionBar';
import Sidebar from 'Components/Sidebar';
import Snackbar from 'Components/Snackbar';
import Viewer from 'Components/Viewer';

const styles = theme => ({
    container: {
        height: 'calc(100% - 100px)',
    },
    main: {
        height: '100vh',
    },
    sidebar: {
        width: 400,
    },
    viewer: {
        margin: theme.spacing.unit,
    },
});

export class App extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object,
    };

    constructor() {
        super();
        this.state = {
            isLoading: true,
            isSnackbarOpen: false,
            selectedNode: null,
            snackbarMessage: '',
            store: null,
            validations: {},
            toggleSnackbar: this.toggleSnackbar,
            updateGlobalContext: this.updateGlobalContext,
            updateTesty: this.updateTesty,
            updateTestyDebounced: debounce(this.updateTesty, 750),
        };
    }

    componentDidMount() {
        fetch('/testy/api')
            .then(data => data.json())
            .then(data => this.setState(prevState => ({ ...prevState, isLoading: false, store: data })))
            .catch(err => console.error(err));
    }

    render() {
        const { classes } = this.props;
        const {
            isLoading,
            selectedNode,
            store,
            validations,
        } = this.state;

        return !isLoading && (
            <main className={classNames('bp3-light', classes.main)}>
                <CssBaseline>
                    <StoreContext.Provider value={this.state}>
                        <ActionBar />
                        <Grid container className={classes.container}>
                            <Grid item className={classes.sidebar}>
                                <Sidebar
                                    activeFixtures={store.active}
                                    fixtures={store.fixtures}
                                    updateGlobalContext={this.updateGlobalContext}
                                />
                            </Grid>
                            <Grid item xs className={classes.viewer}>
                                <Viewer
                                    fixtures={store.fixtures}
                                    selectedNode={selectedNode}
                                    updateTesty={this.updateTesty}
                                    updateGlobalContext={this.updateGlobalContext}
                                    validations={validations}
                                />
                            </Grid>
                        </Grid>
                        <Snackbar />
                    </StoreContext.Provider>
                </CssBaseline>
            </main>
        );
    }

    toggleSnackbar = (msg = this.state.snackbarMessage) => {
        const { isSnackbarOpen } = this.state;
        this.setState({ isSnackbarOpen: !isSnackbarOpen, snackbarMessage: msg });
    }

    updateGlobalContext = nextState => {
        this.setState(nextState)
    }

    updateTesty = action => {
        return fetch('/testy/api', {
            method: 'PUT',
            body: JSON.stringify(action),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(data => data.json())
            .then(data => this.setState({ store: data }))
            .catch(err => console.log(err));
    }
}

export default withStyles(styles)(App);
