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
import Viewer from 'Components/Viewer';

import getBucketedFixtures from 'Helpers/getBucketedFixtures';

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
            selectedFixture: null,
            sidebarBuckets: [],
            snackbarMessage: '',
            store: null,
            validations: {},
            handlers: {
                updateTesty: this.updateTesty,
                updateTestyDebounced: debounce(this.updateTesty, 750),
            },
            nextStoreData: (nextStore) => this.nextStoreData(nextStore),
            updateStoreContext: (nextState) => this.setState(nextState),
            updateTesty: this.updateTesty,
        };
    }

    componentDidMount() {
        fetch('/testy/api')
            .then(data => data.json())
            .then(data => this.setState(prevState => ({ ...prevState, isLoading: false, ...this.nextStoreData(data) })))
            .catch(err => console.error(err));
    }

    toggleSnackbar = (msg = this.state.snackbarMessage) => {
        const { isSnackbarOpen } = this.state;
        this.setState({ isSnackbarOpen: !isSnackbarOpen, snackbarMessage: msg });
    }

    nextStoreData = nextStore => {
        return {
            store: nextStore,
            sidebarBuckets: getBucketedFixtures(nextStore),
        };
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
            .then(data => this.setState({ store: data, sidebarBuckets: getBucketedFixtures(data) }))
            .catch(err => console.log(err));
    }

    render() {
        const { classes } = this.props;

        return !this.state.isLoading && (
            <main className={classNames("bp3-light", classes.main)}>
                <CssBaseline>
                    <StoreContext.Provider value={this.state}>
                        <ActionBar />
                        <Grid container className={classes.container}>
                            <Grid item className={classes.sidebar}>
                                <Sidebar />
                            </Grid>
                            <Grid item xs className={classes.viewer}>
                                <Viewer />
                            </Grid>
                        </Grid>
                    </StoreContext.Provider>
                </CssBaseline>
            </main>
        );
    }
}

export default withStyles(styles)(App);
