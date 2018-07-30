import { cloneDeep } from 'lodash';
import classNames from 'classnames';

import React from 'react';
import PropTypes from 'prop-types';
import { Classes, Tree } from '@blueprintjs/core';
import { withStyles } from '@material-ui/core/styles';

import getBucketedFixtures from 'Helpers/getBucketedFixtures';

const styles = theme => ({
    treeContainer: {
        display: 'relative',
        height: '100%',
        padding: theme.spacing.unit,
        overflow: 'hidden',
    },
    tree: {
        height: '100%',
        overflowY: 'auto',
    },
});

export class Sidebar extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
    };

    static getDerivedStateFromProps = props => {
        return {
            nodeList: getBucketedFixtures(props.fixtures, props.activeFixtures),
        }
    }

    state = {};

    componentDidMount() {
        this.selectFirstItem();
    }

    render() {
        const {
            activeFixtures,
            classes,
            fixtures,
        } = this.props;

        return (
            <div className={classes.treeContainer}>
                <Tree
                    contents={getBucketedFixtures(fixtures, activeFixtures)}
                    onNodeClick={this.handleNodeClick}
                    onNodeCollapse={this.handleNodeCollapse}
                    onNodeExpand={this.handleNodeExpand}
                    className={classNames(classes.tree, Classes.ELEVATION_3)}
                />
            </div>
        );
    }

    handleNodeClick = (nodeData, _nodePath, e) => {
        const { updateGlobalContext } = this.props;
        const { nodeList } = this.state;

        if (nodeData.hasCaret) {
            return;
        }

        const originallySelected = nodeData.isSelected;

        if (!e.shiftKey) {
            this.forEachNode(nodeList, n => (n.isSelected = false));
        }

        nodeData.isSelected = originallySelected == null ? true : !originallySelected;

        updateGlobalContext({ selectedNode: nodeData });

        this.setState({ nodeList: cloneDeep(nodeList) });
    };

    handleNodeCollapse = nodeData => {
        const { nodeList } = this.state;

        nodeData.isExpanded = false;

        this.setState(cloneDeep(nodeList));
    }

    handleNodeExpand = nodeData => {
        const { nodeList } = this.state;

        nodeData.isExpanded = true;

        this.setState(cloneDeep(nodeList));
    }

    forEachNode(nodes, callback) {
        if (nodes == null) {
            return;
        }

        for (const node of nodes) {
            callback(node);
            this.forEachNode(node.childNodes, callback);
        }
    }

    selectFirstItem = () => {
        const { nodeList } = this.state;

        this.handleNodeClick(nodeList[0].childNodes[0], _, {});
    }
}

export default withStyles(styles)(Sidebar);
