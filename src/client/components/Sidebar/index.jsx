import classNames from 'classnames';

import React from 'react';
import PropTypes from 'prop-types';
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

export class Sidebar extends React.PureComponent {
    static propTypes = {
        activeFixtures: PropTypes.object,
        classes: PropTypes.object,
        fixtures: PropTypes.arrayOf(PropTypes.object),
        updateGlobalContext: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            nodeList: getNodeList(props.fixtures, props.activeFixtures),
        };
    }

    static getDerivedStateFromProps = nextProps => {
        return {
            nodeList: getNodeList(nextProps.fixtures, nextProps.activeFixtures),
        };
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
        const { updateGlobalContext } = this.props;
        const { nodeList } = this.state;

        if (nodeData.hasCaret) {
            return;
        }

        this.forEachNode(nodeList, n => (n.isSelected = false));

        nodeData.isSelected = true;

        updateGlobalContext({ selectedNode: nodeData });

        this.setState({ nodeList });
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
