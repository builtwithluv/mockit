import React from 'react';
import { Intent, NumericInput } from '@blueprintjs/core';

import { GlobalContext } from '@client/context';

export class LatencyField extends React.PureComponent {
    render() {
        return (
            <GlobalContext.Consumer>
                {({ store, updateTestyDebounced }) => (
                    <NumericInput
                        intent={Intent.PRIMARY}
                        majorStepSize={50}
                        min={0}
                        onValueChange={val => updateTestyDebounced({ latency: val })}
                        placeholder={store.latency}
                        stepSize={50}
                        value={store.latency}
                    />
                )}
            </GlobalContext.Consumer>
        );
    }
}

export default LatencyField;
