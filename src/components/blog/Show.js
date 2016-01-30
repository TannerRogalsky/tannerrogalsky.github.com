import React from 'react';
import HtmlLayout from '../HtmlLayout.js';

import '../../styles/blog/show.css';

class Show extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="layoutSingleColumn">
        <h1>{this.props.title}</h1>
        <div>
          {this.props.content}
        </div>
        <link href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/styles/github-gist.min.css" rel="stylesheet" />
      </div>
    );
  }
}

Show.propTypes = {
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.node,
};

export default HtmlLayout(Show);
