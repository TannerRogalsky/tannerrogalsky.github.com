import React from 'react';
import HtmlLayout from '../HtmlLayout.js';

import '../../styles/blog/show.css';

const Show = function Show({ prev, name, next }) {
  return (
    <div className="layoutSingleColumn">
      <h1>Loop{name}</h1>
      <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
      {
        prev ? <a href={`/demoloops/${prev}`}>{'<< Previous'}</a> : <span></span>
      }
      <a href="/demoloops/">{"^ Loops"}</a>
      {
        next ? <a href={`/demoloops/${next}`}>Next >></a> : <span></span>
      }
      </nav>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <canvas className="emscripten" id="canvas" onContextMenu="event.preventDefault()"></canvas>
      </div>
      <script type="module" dangerouslySetInnerHTML={{ __html: `import init from '/new_demoloops/demoloop${name}.js';
async function run() {
  await init();
}
run();` }}
      />
    </div>
  );
};

Show.propTypes = {
  prev: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  next: React.PropTypes.string,
};

export default HtmlLayout(Show);
