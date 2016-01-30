import React from 'react';
import HtmlLayout from './HtmlLayout.js';

const About = function About() {
  return (
    <div>
      <p>My name is Tanner Rogalsky.</p>
      <p>This is my code: <a href="https://github.com/TannerRogalsky">https://github.com/TannerRogalsky</a></p>
      <p>These are my games: <a href="https://tannerrogalsky.itch.io/">https://tannerrogalsky.itch.io/</a></p>
    </div>
  );
};

export default HtmlLayout(About);
