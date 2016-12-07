import React from 'react';
import HtmlLayout from '../HtmlLayout.js';

const About = function About() {
  return (
    <div>
      <center>
        <h1>About Demoloops</h1>
        <div className="layoutSingleColumn" >
          <p>
            These demoloops are a product of my wanting to work on more C++ and 3D graphics code. The other primary
            intention was that it be written in a subset of C++ and OpenGL that is supported by Emscripten and WebGL
            to facilitate sharing my work.
          </p>
          <p>
            The framework and loops are open-sourced here: <a href="https://github.com/TannerRogalsky/Demoloops">
              https://github.com/TannerRogalsky/Demoloops
            </a>
          </p>
        </div>
      </center>
    </div>
  );
};

export default HtmlLayout(About);
export const AboutComponent = About;
