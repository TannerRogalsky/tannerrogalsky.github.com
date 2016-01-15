import React from 'react';
import HtmlLayout from '../HtmlLayout.js';

class Show extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='layoutSingleColumn'>
        <h1>{this.props.title}</h1>
        <div>
          {this.props.content}
        </div>
      </div>
    );
  }
}

Show.propTypes = {
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.node,
};

export default HtmlLayout(Show);
