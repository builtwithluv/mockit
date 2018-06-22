import React from 'react';
import debounce from 'lodash.debounce';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import HeaderContainer from './HeaderContainer';
import MethodSortContainer from './MethodSortContainer';

import getBucketedFixtures from './helpers/getBucketedFixtures';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

export class App extends React.PureComponent {
    constructor() {
        super();
        this.handleLatencyChange = debounce(this.handleLatencyChange, 750);
    }

    state = {
        isLoading: true,
        store: {
            fixtures: [],
            active: {},
        },
    };

    componentDidMount() {
        fetch('/testy/api')
            .then(data => data.json())
            .then(data => this.setState({ isLoading: false, store: data }))
            .catch(err => console.error(err));
    }

    handleSelectionChange = e => {
        return fetch('/testy/api', {
            method: 'PUT',
            body: JSON.stringify({ id: e.target.value }),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(data => data.json())
            .then(data => this.setState({ store: data }))
            .catch(err => console.error(err));
    }

    handleLatencyChange = val => {
        if (!val) {
            return;
        }

        return fetch('/testy/api/latency', {
            method: 'PUT',
            body: JSON.stringify({ latency: +val }),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(data => data.json())
            .then(data => this.setState({ store: data }))
            .catch(err => console.error(err));
    }

    handleAlwaysErrorChange = val => {
        return fetch('/testy/api/alwaysError', {
            method: 'PUT',
            body: JSON.stringify({ alwaysError: val }),
            headers: {
                'content-type': 'application/json',
            },
        });
    }

    render() {
        const {
            isLoading,
            store: {
                alwaysError,
                fixtures,
                latency,
                active: activeFixtures,
            },
        } = this.state;

        return !isLoading && (
            <MuiThemeProvider theme={theme}>
                <CssBaseline>
                    <HeaderContainer
                        alwaysError={alwaysError}
                        latency={latency}
                        handleAlwaysErrorChange={this.handleAlwaysErrorChange}
                        handleLatencyChange={this.handleLatencyChange}
                    />
                    <MethodSortContainer
                        activeFixtures={activeFixtures}
                        buckets={getBucketedFixtures(fixtures)}
                        handleSelectionChange={this.handleSelectionChange}
                    />
                </CssBaseline>
            </MuiThemeProvider>
        );
    }
}

export default App;
