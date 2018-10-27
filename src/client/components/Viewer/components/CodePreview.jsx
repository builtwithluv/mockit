import React from 'react';
import beautify from 'js-beautify';
import { Classes } from '@blueprintjs/core';
import Code from 'react-code-prettify';
import { GlobalContext } from '@client/context';
import { findFixture } from '@client/helpers';

export default class CodePreview extends React.PureComponent {
    static contextType = GlobalContext;

    render() {
        const { store: { fixtures }, selectedNode } = this.context;
        const fixture = findFixture(selectedNode.id, fixtures);

        return (fixture._handler || fixture.data) ? (
            <div className={Classes.ELEVATION_2} data-tag="viewer-code">
                <Code
                    language="javascript"
                    codeString={fixture._handler || beautify(JSON.stringify(fixture.data))}
                />
            </div>
        ) : null;
    }
}
