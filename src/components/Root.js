import React from 'react';
import HtmlLayout from './HtmlLayout.js';

const Root = function Root() {
  return (
    <div>
      <a href="hello.html">Hello</a> <a href="world.html">World</a>
    </div>
  );
};

export default HtmlLayout(Root);
