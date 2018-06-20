import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import MethodSortContainer from './MethodSortContainer';

import getBucketedFixtures from './helpers/getBucketedFixtures';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

export class App extends React.PureComponent {
    state = {
        store: {
            fixtures: [],
            active: {},
        },
    };

    componentDidMount() {
        fetch('/armada')
            .then(data => data.json())
            .then(data => this.setState({ store: data }))
            .catch(err => console.error(err));
    }

    handleSelectionChange = e => {
        fetch('/armada', {
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

    render() {
        const { active: activeFixtures, fixtures } = this.state.store;

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline>
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
