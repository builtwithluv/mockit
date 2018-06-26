import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { StoreContext } from 'Context';

export function AlwaysErrorSwitch() {
    return (
        <StoreContext.Consumer>
            {({ store, handlers }) => (
                <FormControlLabel
                    control={
                        <Switch
                            checked={store.alwaysError}
                            onChange={e => handlers.updateTesty({ alwaysError: e.target.checked })}
                        />
                    }
                    label="Always error"
                />
            )}
        </StoreContext.Consumer>
    );
}

export default AlwaysErrorSwitch;
