import React from 'react';
import { Colors } from '@blueprintjs/core';

export class NodeParentLabel extends React.PureComponent {
    render() {
        const { url } = this.props;

        return (
            <span data-tag="sidebar-parent-node" style={{ color: Colors.BLUE5 }}>
                {url}
            </span>
        );
    }
}

export default NodeParentLabel;
