import React from 'react';
import HtmlLayout from './HtmlLayout.js';

const Hello = function Hello() {
  return (
    <div>
      Hello <a href="world.html">World</a>
    </div>
  );
};

export default HtmlLayout(Hello);
