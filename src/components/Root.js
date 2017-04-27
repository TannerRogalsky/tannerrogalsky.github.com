import React from 'react';
import HtmlLayout from './HtmlLayout.js';

const Root = function Root() {
  const threeJSSuffix = process.env.NODE_ENV === 'production' ? '.min' : '';

  return (
    <div>
      <canvas id="bgCanvas" style={{ width: '100vw', height: '100vh', position: 'absolute', left: 0, top: 0 }} />
      <center id="overlay" style={{ position: 'relative' }} >
        <h1>Tanner Rogalsky</h1>
        <p><a href="/blog/">Blog</a> • <a href="/demoloops/">Demoloops</a> • <a href="/about/">About</a></p>
      </center>
      <script src="/root.js" async />
      <script src={`//cdnjs.cloudflare.com/ajax/libs/three.js/85/three${threeJSSuffix}.js`} async />
    </div>
  );
};

export default HtmlLayout(Root);
