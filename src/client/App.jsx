import React from 'react';
import debounce from 'lodash.debounce';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import LatencyContainer from './LatencyContainer';
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
        fetch('/testy/api', {
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

        fetch('/testy/api/latency', {
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

    render() {
        const {
            isLoading,
            store: {
                active: activeFixtures,
                fixtures,
                latency,
            },
        } = this.state;

        return !isLoading && (
            <MuiThemeProvider theme={theme}>
                <CssBaseline>
                    <LatencyContainer
                        handleLatencyChange={this.handleLatencyChange}
                        latency={latency}
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
