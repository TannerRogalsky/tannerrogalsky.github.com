import React from 'react';
import HtmlLayout from './HtmlLayout.js';

const Root = function Root() {
  return (
    <div>
      <a href="/blog/">Blog</a>
      <a href="/about/">About</a>
    </div>
  );
};

export default HtmlLayout(Root);
