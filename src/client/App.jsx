import React from 'react';
import debounce from 'lodash.debounce';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { StoreContext } from 'Context';

import ActionBar from 'Components/ActionBar';
import FixtureOrganizer from 'Components/FixtureOrganizer';
import Snackbar from 'Components/Snackbar';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

export class App extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isSnackbarOpen: false,
            snackbarMessage: '',
            store: null,
            validations: {},
            handlers: {
                setValidation: this.setValidation,
                toggleSnackbar: this.toggleSnackbar,
                updateTesty: this.updateTesty,
                updateTestyDebounced: debounce(this.updateTesty, 750),
            },
        };
    }

    componentDidMount() {
        fetch('/testy/api')
            .then(data => data.json())
            .then(data => this.setState(prevState => ({ ...prevState, isLoading: false, store: data })))
            .catch(err => console.error(err));
    }

    setValidation = ({ id, errors }) => {
        const { validations } = this.state;
        this.setState({ validations: { ...validations, [id]: errors } });
    }

    toggleSnackbar = (msg = this.state.snackbarMessage) => {
        const { isSnackbarOpen } = this.state;
        this.setState({ isSnackbarOpen: !isSnackbarOpen, snackbarMessage: msg });
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

    render() {
        return !this.state.isLoading && (
            <MuiThemeProvider theme={theme}>
                <CssBaseline>
                    <StoreContext.Provider value={this.state}>
                        <ActionBar />
                        <FixtureOrganizer />
                        <Snackbar />
                    </StoreContext.Provider>
                </CssBaseline>
            </MuiThemeProvider>
        );
    }
}

export default App;
