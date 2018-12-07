import './styles.css';

import debounce from 'lodash/debounce';
import get from 'lodash/get';
import classNames from 'classnames';

import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { Spinner } from '@blueprintjs/core';
import Resizable from 're-resizable';

import { GlobalContext } from '@client/context';
import { getActiveFixturesIds, mockitStorage } from '@client/helpers';
import { Storage, Theme } from '@client/enums';

import ActionBar from '@client/components/ActionBar';
import SettingsBar from '@client/components/SettingsBar';
import Sidebar from '@client/components/Sidebar';
import Viewer from '@client/components/Viewer';

const Snackbar = React.lazy(() => import('@client/components/Snackbar'));

const styles = theme => ({
    container: {
        height: 'calc(100% - 130px)',
    },
    main: {
        height: '100vh',
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

        const useLastSavedActiveFixtures = mockitStorage.getItem(Storage.USE_LAST_SAVED_ACTIVE_FIXTURES);

        this.state = {
            isLoading: true,
            isSnackbarOpen: false,
            selectedNode: null,
            snackbarMessage: '',
            store: null,
            theme: mockitStorage.getItem(Storage.THEME) || Theme.DARK,
            useLastSavedActiveFixtures: useLastSavedActiveFixtures === undefined ? true : useLastSavedActiveFixtures,
            validations: {},
            toggleSnackbar: this.toggleSnackbar,
            updateGlobalContext: this.updateGlobalContext,
            updateMockit: this.updateMockit,
            updateMockitDebounced: debounce(this.updateMockit, 750),
            updateValidations: this.updateValidations,
        };
    }

    componentDidMount() {
        const { useLastSavedActiveFixtures } = this.state;
        fetch('/mockit/api', {
            method: 'PUT',
            body: useLastSavedActiveFixtures
                ? JSON.stringify({ id: mockitStorage.getItem(Storage.ACTIVE_FIXTURES) })
                : JSON.stringify({}),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(data => data.json())
            .then(data => this.setState(
                prevState => ({
                    ...prevState,
                    isLoading: false,
                    store: data,
                }))
            )
            .catch(err => console.error(err));
    }

    render() {
        const { classes } = this.props;
        const {
            isLoading,
            isSnackbarOpen,
            selectedNode,
            store,
            theme,
        } = this.state;

        const fixtures = get(store, 'fixtures');

        return !isLoading && (
            <main
                className={classNames(theme, classes.main)}
                style={{
                    backgroundColor: theme === Theme.DARK ? '#30404D' : '#EBF1F5',
                }}
            >
                <CssBaseline>
                    <GlobalContext.Provider value={this.state}>
                        <SettingsBar />
                        <ActionBar />
                        <Grid container className={classes.container}>
                            <Resizable
                                defaultSize={{ width: 400 }}
                                enable={{
                                    top: false,
                                    right: true,
                                    bottom: false,
                                    left: false,
                                    ztopRight: false,
                                    bottomRight: false,
                                    bottomLeft: false,
                                    topLeft: false
                                }}
                            >
                                <Sidebar
                                    activeFixtures={store.activeFixtures}
                                    fixtures={fixtures}
                                    selectedNode={selectedNode}
                                    updateGlobalContext={this.updateGlobalContext}
                                    updateMockit={this.updateMockit}
                                />
                            </Resizable>
                            <Grid item xs className={classes.viewer}>
                                <Viewer />
                            </Grid>
                        </Grid>
                        <React.Suspense fallback={<Spinner size={Spinner.SIZE_SMALL} />}>
                            {isSnackbarOpen && <Snackbar />}
                        </React.Suspense>
                    </GlobalContext.Provider>
                </CssBaseline>
            </main>
        );
    }

    toggleSnackbar = msg => {
        this.setState(prevState => ({
            isSnackbarOpen: !prevState.isSnackbarOpen,
            snackbarMessage: msg || prevState.snackbarMessage,
        }));
    }

    updateGlobalContext = nextState => {
        this.setState(() => nextState);
    }

    updateMockit = action => {
        return fetch('/mockit/api', {
            method: 'PUT',
            body: JSON.stringify(action),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(data => data.json())
            .then(data => {
                mockitStorage.setItem(Storage.ACTIVE_FIXTURES, getActiveFixturesIds(data.activeFixtures));

                this.setState(() => ({ store: data }))
            })
            .catch(err => console.log(err));
    }

    updateValidations = (id, error) => {
        this.setState(prevState => ({
            validations: {
                ...prevState.validations,
                [id]: error,
            },
        }));
    }
}

export default withStyles(styles)(App);
