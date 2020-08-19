import React from 'react';

export default class Code extends React.Component {
  render() {
    return (
      <code>
        {this.props.children}
      </code>
    );
  }
}
