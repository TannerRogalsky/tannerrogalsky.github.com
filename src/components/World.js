import React from 'react';
import HtmlLayout from './HtmlLayout.js';

const World = function World() {
  return (
    <div>
      <a href="hello.html">Hello</a> World
    </div>
  );
};

export default HtmlLayout(World);
