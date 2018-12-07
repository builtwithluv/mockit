import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import memoize from 'lodash/memoize';
import classNames from 'classnames';

import React from 'react';
import { Classes, Tree } from '@blueprintjs/core';
import withStyles from '@material-ui/core/styles/withStyles';

import getNodeList from '@client/components/Sidebar/helpers/getNodeList';

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

const getNodeListMem = memoize(getNodeList);

let activeFixtures;
let fixtures;
let selectedNode;

export class Sidebar extends React.PureComponent {
    state = {
        nodeList: getNodeListMem(this.props.fixtures, this.props.activeFixtures, this.props.updateMockit),
    };

    static getDerivedStateFromProps = (nextProps, nextState) => {
        const nextActiveFixtures = nextProps.activeFixtures;
        const nextFixtures = nextProps.fixtures;
        const nextSelectedNode = nextProps.selectedNode;
        const updateMockit = nextProps.updateMockit;

        if (
            fixtures !== nextFixtures
            || activeFixtures !== nextActiveFixtures
            || selectedNode !== nextSelectedNode
        ) {
            activeFixtures = nextActiveFixtures;
            fixtures = nextFixtures;
            selectedNode = nextSelectedNode;

            return {
                nodeList: getNodeListMem(nextFixtures, nextActiveFixtures, updateMockit, nextSelectedNode),
            };
        }

        return nextState;
    }

    componentDidMount() {
        this.selectFirstItem();
    }

    render() {
        const { classes } = this.props;
        const { nodeList } = this.state;

        return (
            <div data-tag="sidebar" className={classes.treeContainer}>
                <Tree
                    contents={nodeList}
                    onNodeClick={this.handleNodeClick}
                    className={classNames(classes.tree, Classes.ELEVATION_3)}
                />
            </div>
        );
    }

    handleNodeClick = nodeData => {
        const { selectedNode, updateGlobalContext } = this.props;

        if (get(selectedNode, 'id') === nodeData.id || nodeData.hasCaret) {
            return;
        }

        const { nodeList } = this.state;

        this.forEachNode(nodeList, n => (n.isSelected = false));

        nodeData.isSelected = true;

        updateGlobalContext({ selectedNode: nodeData });

        this.setState(() => ({ nodeList: cloneDeep(nodeList) }));
    };

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
        const firstNode = nodeList[0];

        if (firstNode) {
            this.handleNodeClick(firstNode.childNodes[0]);
        }
    }
}

export default withStyles(styles)(Sidebar);
