import React from 'react';
import HtmlLayout from '../HtmlLayout.js';

import '../../styles/blog/show.css';

const Show = function Show({ title, content }) {
  return (
    <div className="layoutSingleColumn">
      <h1>{title}</h1>
      <div>
        {content}
      </div>
      <link href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/styles/github-gist.min.css" rel="stylesheet" />
    </div>
  );
};

Show.propTypes = {
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.node,
};

export default HtmlLayout(Show);
