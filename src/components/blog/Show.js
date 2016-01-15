import React from 'react';
import HtmlLayout from '../HtmlLayout.js';

const Show = function Show(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <div>
        {props.content}
      </div>
    </div>
  );
};

export default HtmlLayout(Show);
