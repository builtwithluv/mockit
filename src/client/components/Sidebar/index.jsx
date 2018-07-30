import { cloneDeep } from 'lodash';
import classNames from 'classnames';

import React from 'react';
import PropTypes from 'prop-types';
import { Classes, Tree } from '@blueprintjs/core';
import { withStyles } from '@material-ui/core/styles';

import { StoreContext } from 'Context';

const styles = theme => ({
    treeContainer: {
        display: 'relative',
        height: '100%',
        padding: theme.spacing.unit,
        overflow: 'hidden',
        overflowY: 'auto',
    },
    tree: {
        height: '100%',
    },
});

export class Sidebar extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
    };

    items;
    updateGlobalContext;

    componentDidMount() {
        this.selectFirstItem();
    }

    render() {
        const { classes } = this.props;

        return (
            <StoreContext.Consumer>
                {({ sidebarBuckets, updateGlobalContext }) => {
                    this.items = sidebarBuckets;
                    this.updateGlobalContext = updateGlobalContext;

                    return (
                        <div className={classes.treeContainer}>
                            <Tree
                                contents={sidebarBuckets}
                                onNodeClick={this.handleNodeClick}
                                onNodeCollapse={this.handleNodeCollapse}
                                onNodeExpand={this.handleNodeExpand}
                                className={classNames(classes.tree, Classes.ELEVATION_3)}
                            />
                        </div>
                    );
                }}
            </StoreContext.Consumer>
        );
    }

    handleNodeClick = (nodeData, _nodePath, e) => {
        if (nodeData.hasCaret) {
            return;
        }
        const originallySelected = nodeData.isSelected;
        if (!e.shiftKey) {
            this.forEachNode(this.items, n => (n.isSelected = false));
        }
        nodeData.isSelected = originallySelected == null ? true : !originallySelected;
        this.updateGlobalContext({ sidebarBuckets: cloneDeep(this.items), selectedFixture: nodeData });
    };

    handleNodeCollapse = nodeData => {
        nodeData.isExpanded = false;
        this.updateGlobalContext(cloneDeep(this.items));
    }

    handleNodeExpand = nodeData => {
        nodeData.isExpanded = true;
        this.updateGlobalContext(cloneDeep(this.items));
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
        this.handleNodeClick(this.items[0].childNodes[0], _, {});
    }
}

export default withStyles(styles)(Sidebar);
