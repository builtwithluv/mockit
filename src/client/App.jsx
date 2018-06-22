import React from 'react';
import debounce from 'lodash.debounce';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { StoreContext } from './context/store-context';

import HeaderContainer from './HeaderContainer';
import MethodSortContainer from './MethodSortContainer';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

export class App extends React.PureComponent {
    constructor() {
        super();
        this.handleLatencyChange = debounce(this.handleLatencyChange, 750);
        this.state = {
            isLoading: true,
            store: null,
            handlers: {
                handleAlwaysErrorChange: this.handleAlwaysErrorChange,
                handleLatencyChange: this.handleLatencyChange,
                handleSelectionChange: this.handleSelectionChange,
            },
        };
    }

    componentDidMount() {
        fetch('/testy/api')
            .then(data => data.json())
            .then(data => this.setState(prevState => ({ ...prevState, isLoading: false, store: data })))
            .catch(err => console.error(err));
    }

    handleSelectionChange = val => {
        return fetch('/testy/api', {
            method: 'PUT',
            body: JSON.stringify({ id: val }),
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
            body: JSON.stringify({ latency: val }),
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
        })
            .then(data => data.json())
            .then(data => this.setState({ store: data }))
            .catch(err => console.error(err));
    }

    render() {
        return !this.state.isLoading && (
            <MuiThemeProvider theme={theme}>
                <CssBaseline>
                    <StoreContext.Provider value={this.state}>
                        <HeaderContainer />
                        <MethodSortContainer />
                    </StoreContext.Provider>
                </CssBaseline>
            </MuiThemeProvider>
        );
    }
}

export default App;
