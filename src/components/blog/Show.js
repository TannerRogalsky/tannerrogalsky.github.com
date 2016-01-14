import React from 'react';
import HtmlLayout from '../HtmlLayout.js';

const Show = function Show(props) {
  return (
    <div>
      {props.content}
    </div>
  );
};

export default HtmlLayout(Show);
