import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { StoreContext } from './context/store-context';

export function AlwaysErrorSwitch() {
    return (
        <StoreContext.Consumer>
            {({ store, handlers }) => (
                <FormControlLabel
                    control={
                        <Switch
                            checked={store.alwaysError}
                            onChange={e => handlers.handleAlwaysErrorChange(e.target.checked)}
                        />
                    }
                    label="Always error"
                />
            )}
        </StoreContext.Consumer>
    );
}

export default AlwaysErrorSwitch;
