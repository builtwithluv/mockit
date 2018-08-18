import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from '@blueprintjs/core';

export class NodeParentLabel extends React.PureComponent {
    static propTypes = {
        url: PropTypes.string,
    };

    render() {
        const { url } = this.props;

        return (
            <span data-tag="sidebar-parent-node" style={{ color: Colors.BLUE1 }}>
                {url}
            </span>
        );
    }
}

export default NodeParentLabel;
